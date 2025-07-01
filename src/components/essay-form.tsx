'use client';

import { useState, useRef } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { extractText } from "@/app/actions";

const formSchema = z.object({
  essay: z.string()
    .min(50, { message: "텍스트는 50자 이상이어야 합니다." })
    .max(10000, { message: "텍스트는 10,000자를 초과할 수 없습니다." }),
});

type EssayFormProps = {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  isLoading: boolean;
};

const EssayForm = ({ onSubmit, isLoading }: EssayFormProps) => {
  const [isOcrLoading, setIsOcrLoading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      essay: "",
    },
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
            variant: "destructive",
            title: "파일 크기 초과",
            description: "이미지 파일은 5MB를 초과할 수 없습니다.",
        });
        return;
    }

    setIsOcrLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const photoDataUri = reader.result as string;
      const { text, error } = await extractText({ photoDataUri });

      if (error) {
        toast({
          variant: "destructive",
          title: "OCR 오류",
          description: error,
        });
      } else if (text) {
        form.setValue('essay', text);
        toast({
            title: "텍스트 추출 완료",
            description: "이미지에서 텍스트를 추출하여 입력란에 채웠습니다. 내용을 확인하고 분석 버튼을 눌러주세요.",
        });
      } else {
        toast({
            variant: "destructive",
            title: "OCR 오류",
            description: "이미지에서 텍스트를 찾을 수 없습니다.",
        });
      }
      setIsOcrLoading(false);
    };
    reader.onerror = (error) => {
        console.error("File reading error:", error);
        toast({
            variant: "destructive",
            title: "파일 오류",
            description: "파일을 읽는 중 오류가 발생했습니다.",
        });
        setIsOcrLoading(false);
    }

    // Reset file input value to allow re-uploading the same file
    if (event.target) {
        event.target.value = '';
    }
  };

  const totalLoading = isLoading || isOcrLoading;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-8">
        <FormField
          control={form.control}
          name="essay"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">에세이</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="여기에 학생이 작성한 글을 붙여넣으세요..."
                  className="min-h-[300px] text-base"
                  disabled={totalLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-border"></div>
            <span className="flex-shrink mx-4 text-muted-foreground text-sm">또는</span>
            <div className="flex-grow border-t border-border"></div>
        </div>
        
        <input type="file" ref={fileInputRef} id="image-upload" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} disabled={totalLoading} />
        <Button type="button" variant="outline" className="w-full" disabled={totalLoading} onClick={() => fileInputRef.current?.click()}>
            {isOcrLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    이미지 읽는 중...
                </>
            ) : (
                <>
                    <Upload className="mr-2 h-4 w-4" />
                    이미지 파일에서 텍스트 추출
                </>
            )}
        </Button>

        <Button type="submit" className="w-full" disabled={totalLoading} size="lg">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              분석 중...
            </>
          ) : (
            '분석하기'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EssayForm;
