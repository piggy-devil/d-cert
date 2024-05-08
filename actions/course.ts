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

export const getAllCourse = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!session || !user) {
    redirect("/api/auth/signin?callbackUrl=/courses");
  }

  // console.log("getCourese: ", user);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_END_POINT_DIAS}/courses`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to get all course.");
    }

    return res.json();
  } catch {
    throw new Error("Something went wrong!.");
  }
};

export const getMeCourse = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!session || !user) {
    redirect("/api/auth/signin?callbackUrl=/courses");
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_END_POINT_DIAS}/courses/me`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to get all course.");
    }

    return res.json();
  } catch {
    throw new Error("Something went wrong!.");
  }
};

export const getCourse = async (id: string) => {
  const session = await getSession();
  const user = session?.user;

  if (!session || !user) {
    redirect("/api/auth/signin?callbackUrl=/courses");
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_END_POINT_DIAS}/courses/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user?.token}`,
        },
      }
    );

    // console.log("res: ", res);

    if (!res.ok) {
      throw new Error("Failed to get course.");
    }

    return await res.json();
  } catch (error) {
    return error;
  }
};
