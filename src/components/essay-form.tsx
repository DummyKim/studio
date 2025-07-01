'use client';

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
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  essay: z.string()
    .min(50, { message: "에세이는 50자 이상이어야 합니다." })
    .max(10000, { message: "에세이는 10,000자를 초과할 수 없습니다." }),
});

type EssayFormProps = {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  isLoading: boolean;
};

const EssayForm = ({ onSubmit, isLoading }: EssayFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      essay: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-8">
        <FormField
          control={form.control}
          name="essay"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Essay</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="여기에 학생 에세이를 붙여넣으세요..."
                  className="min-h-[300px] text-base"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading} size="lg">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
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
