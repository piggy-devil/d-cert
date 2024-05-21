import { date, object, string, z } from "zod";

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

export const CourseSchema = object({
  course: string().min(1, {
    message: "Course name is required",
  }),
});

const base64Validator = (value: string) => {
  try {
    return Buffer.from(value, "base64").toString("base64") === value;
  } catch {
    return false;
  }
};

export const CourseDetailSchema = object({
  course: string().min(1, {
    message: "Course name is required",
  }),
  instituteId: string().optional(),
  dateOfStudyStart: date({
    required_error: "A date of Start is required.",
  }),
  dateOfStudyEnd: date({
    required_error: "A date of End is required.",
  }),
  dateOfExpireCert: date().optional(),
  signature: string().min(1, {
    message: "signature is required",
  }),
});

export type AddUserSchemaTypes = {
  titleName: string;
  firstName: string;
  lastName: string;
  recipientEmail: string;
};

export const AddUserSchema = object({
  titleName: string().min(1, {
    message: "TitleName is required",
  }),
  firstName: string().min(1, {
    message: "FirstName is required",
  }),
  lastName: string().min(1, {
    message: "LastName is required",
  }),
  recipientEmail: string()
    .min(1, {
      message: "Please enter user email address",
    })
    .email({
      message: "Please enter a valid email address",
    }),
});

export type CourseDetailTypes = {
  _id: string;
  course: string;
  instituteId?: string;
  dateOfStudyStart: string;
  dateOfStudyEnd: string;
  dateOfExpireCert?: string;
  signature: string;
};

export const SettingsSchema = object({
  name: string().min(1, {
    message: "name is required",
  }),
  email: string()
    .min(1, {
      message: "Please enter your email address",
    })
    .email({
      message: "Please enter a valid email address",
    }),
  role: string(),
});
