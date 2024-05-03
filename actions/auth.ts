// "use server";
import { LoginSchema } from "./../schemas/index";
import { z } from "zod";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "./user";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";

type RegisterSchemaType = z.infer<typeof RegisterSchema>;
type LoginSchemaType = z.infer<typeof LoginSchema>;

export const register = async (values: RegisterSchemaType) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_END_POINT_DIAS}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: name,
          password: password,
          // role: role,
        }),
      }
    );

    if (!res.ok) {
      return { error: res.statusText };
    }

    return { success: "User Created!." };
  } catch (error) {
    console.log(error);
    return { error: "Register Fail!." };
  }
};

export const login = async (values: LoginSchemaType) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validateFields.data;

  try {
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (res?.error) {
      return { error: "Logged in Fail!" };
    }

    return { success: "Logged in successfully!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
