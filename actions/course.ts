"use server";

import * as z from "zod";

import { CourseSchema } from "@/schemas";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

export const createCourse = async (values: z.infer<typeof CourseSchema>) => {
  const validatedFields = CourseSchema.safeParse(values);
  const session = await getSession();
  const user = session?.user;

  if (!session || !user) {
    redirect("/api/auth/signin?callbackUrl=/courses");
  }

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { course } = validatedFields.data;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_END_POINT_DIAS}/courses`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          course: course,
        }),
      }
    );

    if (!res.ok) {
      return { error: res.statusText };
    }

    const { _id } = await res.json();

    return { success: "Course Created!.", id: _id };
  } catch (error) {
    console.log(error);
    return { error: "Course Fail!." };
  }
};
