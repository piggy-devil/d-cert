"use client";

import { createCourse } from "@/actions/course";
import { AuthWrapper } from "@/app/(auth)/_components/AuthWrapper";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { CourseSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type CourseSchemaType = z.infer<typeof CourseSchema>;

export const CreateCourseForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(CourseSchema),
    defaultValues: {
      course: "",
    },
  });

  const onSubmit = async (values: CourseSchemaType) => {
    setError("");

    startTransition(async () => {
      const res = await createCourse(values);

      if (res.success) {
        setSuccess(res.success);
        toast({
          description: `${res.success}`,
        });
        router.push(`/courses/${res.id}`);
      }

      if (res.error) {
        setError(res.error);
      }
    });
  };

  return (
    <AuthWrapper title="Create Course" description="Blockchain Technology">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-6"
        >
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="course name"
                    type="course"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending} className="w-full">
            Create Course
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};
