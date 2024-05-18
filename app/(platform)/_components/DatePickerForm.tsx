"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { string, z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { useState, useTransition } from "react";
import { CourseDetailSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import { AuthWrapper } from "@/app/(auth)/_components/AuthWrapper";
import { updateCourse } from "@/actions/course";
import { useRouter } from "next/navigation";

type Props = {
  courseId: string;
  course: string;
  instituteId?: string;
  dateOfStudyStart: string;
  dateOfStudyEnd: string;
  dateOfExpireCert?: string;
};

export const CourseDetailForm = ({
  courseId,
  course,
  instituteId,
  dateOfStudyStart,
  dateOfStudyEnd,
  dateOfExpireCert,
}: Props) => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const [startDate, setStartDate] = useState<Date | undefined>(
    dateOfStudyStart ? new Date(dateOfStudyStart) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    dateOfStudyEnd ? new Date(dateOfStudyEnd) : undefined
  );

  const form = useForm<z.infer<typeof CourseDetailSchema>>({
    resolver: zodResolver(CourseDetailSchema),
    defaultValues: {
      course: course,
      dateOfStudyStart: startDate,
      dateOfStudyEnd: endDate,
      dateOfExpireCert: dateOfExpireCert
        ? new Date(dateOfExpireCert)
        : undefined,
    },
  });

  function onSubmit(values: z.infer<typeof CourseDetailSchema>) {
    setError("");

    startTransition(async () => {
      const formattedData = {
        ...values,
        dateOfStudyStart: values.dateOfStudyStart.toISOString(),
        dateOfStudyEnd: values.dateOfStudyEnd.toISOString(),
        dateOfExpireCert: values.dateOfExpireCert?.toISOString(),
      };
      console.log("data: ", formattedData);
      const res = await updateCourse(values, courseId);
      if (res.success) {
        setSuccess(res.success);
        toast({
          description: `${res.success}`,
        });
        // router.push(`/courses/${res.id}`);
        router.refresh();
      }
      if (res.error) {
        setError(res.error);
      }
    });
  }

  return (
    <AuthWrapper title="รายละเอียดหลักสูตร" description="Blockchain Technology">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ชื่อหลักสูตร</FormLabel>
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

          <FormField
            control={form.control}
            name="dateOfStudyStart"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>เริ่มต้น</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setStartDate(date);
                      }}
                      disabled={(date) => (endDate ? date > endDate : false)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>วันแรกของการฝึกอบรม</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfStudyEnd"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>สิ้นสุด</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setEndDate(date);
                      }}
                      disabled={(date) =>
                        startDate ? date < startDate : false
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>วันสุดท้ายของการฝึกอบรม</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfExpireCert"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>ใบเซอร์หมดอายุ (ถ้ามี)</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        startDate ? date < startDate : false
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  มีหรือไม่มีก็ได้ ขึ้นอยู่กับเงื่อนไขของใบเซอร์
                </FormDescription>
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
