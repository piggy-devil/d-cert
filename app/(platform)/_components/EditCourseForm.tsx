"use client";

import { updateCourse } from "@/actions/course";
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

type EditCourseFormTypes = {
  course: CourseSchemaType;
  id: string;
  onClose: () => void;
};

export const EditCourseForm = ({
  course,
  id,
  onClose,
}: EditCourseFormTypes) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(CourseSchema),
    defaultValues: {
      course: course.course,
    },
  });

  const onSubmit = async (values: CourseSchemaType) => {
    setError("");

    startTransition(async () => {
      try {
        const res = await updateCourse(values, id);

        if (res.success) {
          setSuccess(res.success);
          toast({
            description: `${res.success}`,
          });
        }
      } catch (error) {
        toast({
          description: "Something went wrong",
          variant: "destructive",
        });
      } finally {
        router.refresh();
        onClose();
      }
    });
  };

  return (
    <AuthWrapper title="Edit Course" description="Blockchain Technology">
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
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending} className="w-full">
            Edit Course
          </Button>
        </form>
        <Button variant="ghost" onClick={onClose} className="w-full mt-2">
          Cancel
        </Button>
      </Form>
    </AuthWrapper>
  );
};
