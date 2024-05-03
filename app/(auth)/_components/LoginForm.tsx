"use client";

import { LoginSchema } from "@/schemas";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { passwordStrength } from "check-password-strength";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
// import { signIn } from "next-auth/react";
// import { login } from "@/actions/user";
import PasswordStrength from "./PasswordStrength";
import { login } from "@/actions/auth";
import { AuthWrapper } from "./AuthWrapper";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type LoginFormProps = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};

type LoginSchemaType = z.infer<typeof LoginSchema>;

export const LoginForm = (props: LoginFormProps) => {
  const { toast } = useToast();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [passStrength, setPassStrength] = useState(0);
  const router = useRouter();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const formValues = form.watch().password;
  // useEffect(() => {
  //   setPassStrength(passwordStrength(formValues).id);
  // }, [formValues]);

  const onSubmit = async (values: LoginSchemaType) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const res = await login(values);

      if (res.success) {
        setSuccess(res.success);
        toast({
          description: `${res.success}`,
        });
        router.push(props.callbackUrl ? props.callbackUrl : "/");
      }

      console.log("res: ", res);
      console.log("callback: ", props.callbackUrl);

      if (res.error) {
        setError(res.error);
      }
    });
  };

  return (
    <AuthWrapper
      title="🔓Sign In"
      description="Blockchain Technology"
      backButtonLabel="Don't have an account?"
      backButtonHref="/sign-up"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="dias@mwa.co.th"
                    autoComplete="email"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    autoComplete="current-password"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Sign In
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};
