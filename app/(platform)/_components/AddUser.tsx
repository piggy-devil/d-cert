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
import { AddUserSchema, AddUserSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

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
  isEdit?: boolean;
  userId?: string;
  onClose?: () => void;
  values?: AddUserSchemaType;
};

export const AddUser = ({
  courseId,
  isEdit,
  userId,
  onClose,
  values,
}: AddUserProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<AddUserSchemaType>({
    resolver: zodResolver(AddUserSchema),
    defaultValues: {
      titleName: isEdit ? values?.titleName : "",
      firstName: isEdit ? values?.firstName : "",
      lastName: isEdit ? values?.lastName : "",
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

  const onSubmit = async (values: AddUserSchemaType) => {
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
      title={isEdit ? "Edit User" : "Create User"}
      description="Blockchain Technology"
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
              "Edit User"
            ) : (
              "Create User"
            )}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};
