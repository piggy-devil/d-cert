"use client";

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
import { SettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type SettingsSchemaType = z.infer<typeof SettingsSchema>;

// type SettingsSchemaType = {
//   setting: SettingsSchemaType;
// };

export const SettingsForm = ({ name, email, role }: SettingsSchemaType) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [allowed, setAllowed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  if (role === "admin") setIsAdmin(true);

  const form = useForm<SettingsSchemaType>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: name || "",
      email: email || "",
      role: role,
    },
  });

  const onSubmit = async (values: SettingsSchemaType) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      //   const res = await createCourse(values);
      //   if (res.success) {
      //     setSuccess(res.success);
      //     toast({
      //       description: `${res.success}`,
      //     });
      //     router.push(`/courses/${res.id}`);
      //   }
      //   if (res.error) {
      //     setError(res.error);
      //   }
    });
  };

  return (
    // <AuthWrapper title="สร้างหลักสูตร" description="Blockchain Technology">
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-6 w-64"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ชื่อ</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending || !allowed}
                  placeholder=""
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>อีเมล</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending || !allowed}
                  placeholder=""
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>role</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending || !allowed || !isAdmin}
                  placeholder=""
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        {allowed ? (
          <Button
            type="submit"
            disabled={isPending}
            onClick={() => setAllowed(false)}
            className="w-full"
          >
            บันทึก
          </Button>
        ) : isPending ? (
          <div className="flex items-center">
            <Loader2 className="animate-spin duration-500 text-slate-400" />
          </div>
        ) : (
          <Button
            type="submit"
            disabled={isPending}
            onClick={() => setAllowed(true)}
            className="w-full"
          >
            เปลี่ยนแปลงข้อมูล
          </Button>
        )}
      </form>
    </Form>
    // </AuthWrapper>
  );
};
