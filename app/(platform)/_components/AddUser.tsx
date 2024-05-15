"use client";

import { addUser } from "@/actions/course";
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
import { AddUserSchema, CourseSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const titleNames = [
  { value: "นาย", label: "นาย" },
  { value: "นาง", label: "นาง" },
  { value: "นางสาว", label: "นางสาว" },
  { value: "ดร.", label: "ดร." },
  { value: "ผศ.", label: "ผศ." },
  { value: "รศ.", label: "รศ." },
  { value: "ศ.", label: "ศ." },
  { value: "อาจารย์", label: "อาจารย์" },
  { value: "พล.ต.อ.", label: "พล.ต.อ." },
  { value: "พล.อ.", label: "พล.อ." },
  { value: "ม.ล.", label: "ม.ล." },
  { value: "ม.ร.ว.", label: "ม.ร.ว." },
  { value: "พล.ต.ท.", label: "พล.ต.ท." },
  { value: "พล.ต.ต.", label: "พล.ต.ต." },
  { value: "พ.ต.อ.", label: "พ.ต.อ." },
  { value: "พ.ต.ท.", label: "พ.ต.ท." },
  { value: "พ.ต.ต.", label: "พ.ต.ต." },
  { value: "ร.ต.อ.", label: "ร.ต.อ." },
  { value: "ร.ต.ท.", label: "ร.ต.ท." },
  { value: "ร.ต.ต.", label: "ร.ต.ต." },
  { value: "ร.ต.", label: "ร.ต." },
  { value: "ร.ท.", label: "ร.ท." },
  { value: "ร.อ.", label: "ร.อ." },
  { value: "จ.ส.อ.", label: "จ.ส.อ." },
  { value: "จ.ส.ท.", label: "จ.ส.ท." },
  { value: "จ.ส.ต.", label: "จ.ส.ต." },
];

type AddUserProps = {
  courseId: string;
};

export const AddUser = ({ courseId }: AddUserProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof AddUserSchema>>({
    resolver: zodResolver(AddUserSchema),
    defaultValues: {
      titleName: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof AddUserSchema>) => {
    setError("");

    startTransition(async () => {
      const res = await addUser(values, courseId);

      if (res.success) {
        setSuccess(res.success);
        toast({
          description: `${res.success}`,
        });
        router.refresh();
      }

      if (res.error) {
        setError(res.error);
      }
    });
  };

  return (
    <AuthWrapper title="Create User" description="Blockchain Technology">
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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

          <FormError message={error} />
          <FormSuccess message={success} />

          <Button type="submit" disabled={isPending} className="w-full">
            Create User
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};