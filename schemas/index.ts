import { object, string } from "zod";

export type User = {
  id: string;
  name: string;
  role: string;
  token: string;
};

export const LoginSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" }).min(
    1,
    "Password is required"
  ),
  // .min(8, "Password must be more than 8 characters")
  // .max(32, "Password must be less than 32 characters"),
});

export const RegisterSchema = object({
  email: string()
    .min(1, {
      message: "Please enter your email address",
    })
    .email({
      message: "Please enter a valid email address",
    }),
  password: string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  //   .regex(/[a-z]/, {
  //     message: "Password must contain at least one lowercase letter",
  //   })
  //   .regex(/[A-Z]/, {
  //     message: "Password must contain at least one uppercase letter",
  //   })
  //   .regex(/[0-9]/, {
  //     message: "Password must contain at least one number",
  //   }),
  name: string().min(1, {
    message: "Name is required",
  }),
  role: string().default("user"),
});

export const RegisterFormSchema = RegisterSchema.extend({
  confirmPassword: string().min(1, {
    message: "Please confirm your password",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
