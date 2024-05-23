"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useEffect, useState, useTransition } from "react";
import { CourseDetailSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import { AuthWrapper } from "@/app/(auth)/_components/AuthWrapper";
import { updateCourse } from "@/actions/course";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { resizeImage } from "@/lib/image";
import { DeleteCourse } from "./DeleteCourse";

type Props = {
  courseId: string;
  course: string;
  instituteId?: string;
  dateOfStudyStart: string;
  dateOfStudyEnd: string;
  dateOfExpireCert?: string;
  signature: string;
  issueStatus: string;
};

export const CourseDetailForm = ({
  courseId,
  course,
  instituteId,
  dateOfStudyStart,
  dateOfStudyEnd,
  dateOfExpireCert,
  signature,
  issueStatus,
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

  const [signatureBase64, setSignatureBase64] = useState<string>("");

  const convertToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;
      setSignatureBase64(base64String);
      setValue("signature", base64String); // Update the form state
    };
    reader.onerror = (error) => {
      console.error("Error converting file to base64:", error);
    };
  };

  const form = useForm<z.infer<typeof CourseDetailSchema>>({
    resolver: zodResolver(CourseDetailSchema),
    defaultValues: {
      course: course,
      dateOfStudyStart: startDate,
      dateOfStudyEnd: endDate,
      dateOfExpireCert: dateOfExpireCert
        ? new Date(dateOfExpireCert)
        : undefined,
      signature: signature,
    },
  });

  const { watch, reset, setValue } = form;

  const watchedValues = watch();
  let isFormChanged =
    JSON.stringify(watchedValues) !==
    JSON.stringify(form.control._defaultValues);

  useEffect(() => {
    const subscription = watch(() => {
      setError("");
      // setSuccess("");
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const resizedImage = await resizeImage(file, 400, 400);
        convertToBase64(resizedImage);
      } catch (error) {
        console.error("Error resizing image:", error);
      }
    }
  };

  function onSubmit(values: z.infer<typeof CourseDetailSchema>) {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const res = await updateCourse(values, courseId);
      if (res.success) {
        setSuccess(res.success);
        toast({
          description: `${res.success}`,
        });
        // router.push(`/courses/${res.id}`);
        router.refresh();
        reset(values);
      }
      if (res.error) {
        setError(res.error);
        setSuccess("");
      }
    });
  }

  return (
    <AuthWrapper
      title="รายละเอียดหลักสูตร"
      description="Blockchain Technology"
      status={issueStatus}
    >
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

          {/* <Image src={signature} alt="Signature" width={120} height={120} /> */}
          {signatureBase64 && (
            <div className="flex items-center justify-center">
              <Image
                src={signatureBase64}
                alt="Signature"
                width={120}
                height={120}
              />
            </div>
          )}
          {signature && !signatureBase64 && (
            <div className="flex items-center justify-center">
              <Image src={signature} alt="Signature" width={120} height={120} />
            </div>
          )}

          <FormField
            control={form.control}
            name="signature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ลายเซ็นต์</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError message={error} />
          <FormSuccess message={success} />

          <Button
            type="submit"
            disabled={isPending || !isFormChanged}
            className="w-full"
          >
            {isPending ? (
              <Loader2 className="animate-spin duration-500 text-slate-400" />
            ) : (
              "แก้ไขหลักสูตร"
            )}
          </Button>
        </form>
        <DeleteCourse
          className="w-full hover:bg-destructive hover:text-white mt-2"
          id={courseId}
          afterDelete="/courses"
        >
          Delete
        </DeleteCourse>
      </Form>
    </AuthWrapper>
  );
};
