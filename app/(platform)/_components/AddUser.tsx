"use client";

import { addUser, updateUser } from "@/actions/course";
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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { AddUserSchema, AddUserSchemaTypes } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { titleNames } from "@/lib/title";

type AddUserProps = {
  courseId: string;
  courseName: string;
  isEdit?: boolean;
  userId?: string;
  onClose?: () => void;
  values?: AddUserSchemaTypes;
};

export const AddUser = ({
  courseId,
  courseName,
  isEdit,
  userId,
  onClose,
  values,
}: AddUserProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  console.log(courseName);

  const form = useForm<AddUserSchemaTypes>({
    resolver: zodResolver(AddUserSchema),
    defaultValues: {
      titleName: isEdit ? values?.titleName : "",
      firstName: isEdit ? values?.firstName : "",
      lastName: isEdit ? values?.lastName : "",
      recipientEmail: isEdit ? values?.recipientEmail : "",
    },
  });

  useEffect(() => {
    if (isEdit) {
      const subscription = form.watch(() => {
        setError("");
        setSuccess("");
      });
      return () => subscription.unsubscribe();
    }
  }, [form, isEdit]);

  const watchedValues = form.watch();
  const isFormChanged =
    isEdit &&
    JSON.stringify(watchedValues) !==
      JSON.stringify(form.control._defaultValues);

  const isFormValid = Object.values(watchedValues).every(
    (value) => value !== ""
  );

  const onSubmit = async (values: AddUserSchemaTypes) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      let res = null;
      if (isEdit) {
        res = await updateUser(values, courseId, userId!); // Update user
      } else {
        res = await addUser(values, courseId); // Add user
      }

      if (res.success) {
        setSuccess(res.success);
        toast({
          description: `${res.success}`,
        });

        router.refresh();
        form.reset();

        if (onClose) {
          onClose(); // Close the dialog if onClose is provided
        }
      }

      if (res.error) {
        setError(res.error);
      }
    });
  };

  return (
    <AuthWrapper
      title={isEdit ? "แก้ไขรายชื่อ" : "ผู้จบหลักสูตร"}
      description={`${courseName}`}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-6"
        >
          <FormField
            control={form.control}
            name="titleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>คำนำหน้าชื่อ</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="โปรดระบุ - คำนำหน้าชื่อ" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {titleNames.map((title) => (
                      <SelectItem key={title.value} value={title.value}>
                        {title.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>โปรดเลือกคำนำหน้าชื่อ</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ชื่อตัว</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="สมชาย"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ชื่อสกุล</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="เข็มกลัด"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recipientEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>อีเมล</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="exsample@mwa.co.th"
                    type="email"
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
            disabled={isPending || !isFormValid || (isEdit && !isFormChanged)}
            className="w-full"
          >
            {isPending ? (
              <Loader2 className="animate-spin duration-500 text-slate-400" />
            ) : isEdit ? (
              "แก้ไข"
            ) : (
              "เพิ่ม"
            )}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};
