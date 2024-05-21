"use server";

import * as z from "zod";

import { AddUserSchema, CourseDetailSchema, CourseSchema } from "@/schemas";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

export const deleteCourse = async (id: string) => {
  const session = await getSession();
  const user = session?.user;

  if (!session || !user) {
    redirect("/api/auth/signin?callbackUrl=/courses");
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_END_POINT_DIAS}/courses/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to delete course.");
    }

    return { success: "Course Delete Successfully!." };
  } catch {
    throw new Error("Something went wrong!.");
  }
};

export const updateCourse = async (
  values: z.infer<typeof CourseDetailSchema>,
  id: string
) => {
  const validatedFields = CourseDetailSchema.safeParse(values);
  const session = await getSession();
  const user = session?.user;

  if (!session || !user) {
    redirect("/api/auth/signin?callbackUrl=/courses");
  }

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const data = validatedFields.data;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_END_POINT_DIAS}/courses/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      return { error: res.statusText };
    }

    return { success: "Update Course Detail." };
  } catch (error) {
    console.log(error);
    return { error: "Update Course Fail." };
  }
};

export const createCourse = async (
  values: z.infer<typeof CourseSchema>,
  id?: string
) => {
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

  let res = null;

  try {
    if (id) {
      res = await fetch(
        `${process.env.NEXT_PUBLIC_END_POINT_DIAS}/courses/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({
            course: course,
          }),
        }
      );

      if (res.ok) {
        return { success: "Course Edit!." };
      }
    } else {
      res = await fetch(`${process.env.NEXT_PUBLIC_END_POINT_DIAS}/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          course: course,
        }),
      });
    }

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
          "Content-Type": "application/json",
          authorization: `Bearer ${user?.token}`,
        },
      }
    );

    if (res.status === 404) {
      return null;
    }

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

    if (!res.ok) {
      throw new Error("Failed to get course.");
    }

    const course = await res.json();

    // Transform _id to courseId
    return {
      ...course,
      // courseId: course._id,
    };
  } catch (error) {
    return error;
  }
};

export const addUser = async (
  values: z.infer<typeof AddUserSchema>,
  id?: string
) => {
  const validatedFields = AddUserSchema.safeParse(values);
  const session = await getSession();
  const user = session?.user;

  if (!session || !user) {
    redirect("/api/auth/signin?callbackUrl=/courses");
  }

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { titleName, firstName, lastName } = validatedFields.data;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_END_POINT_DIAS}/courses/${id}/graduates`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify([
          {
            titleName: titleName,
            firstName: firstName,
            lastName: lastName,
          },
        ]),
      }
    );

    if (!res.ok) {
      return { error: res.statusText };
    }

    console.log("res: ", await res.json());

    // const {} = await res.json();

    return { success: "User Graduates Created!." };
  } catch (error) {
    console.log(error);
    return { error: "User Graduates Fail!." };
  }
};

export const getUser = async (courseId: string, userId: string) => {
  const session = await getSession();
  const user = session?.user;

  if (!session || !user) {
    redirect("/api/auth/signin?callbackUrl=/courses");
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_END_POINT_DIAS}/courses/${courseId}/graduates/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user?.token}`,
        },
      }
    );

    if (!res.ok) {
      // throw new Error("Failed to get course.");
      return { error: "Get All User Graduates Fail!." };
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!." };
  }
};

export const getUsers = async (id: string) => {
  const session = await getSession();
  const user = session?.user;

  if (!session || !user) {
    redirect("/api/auth/signin?callbackUrl=/courses");
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_END_POINT_DIAS}/courses/${id}/graduates`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user?.token}`,
        },
      }
    );

    if (!res.ok) {
      // throw new Error("Failed to get course.");
      return { error: "Get All User Graduates Fail!." };
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!." };
  }
};

export const updateUser = async (
  values: z.infer<typeof AddUserSchema>,
  courseId: string,
  userId: string
) => {
  const validatedFields = AddUserSchema.safeParse(values);
  const session = await getSession();
  const user = session?.user;

  if (!session || !user) {
    redirect("/api/auth/signin?callbackUrl=/courses");
  }

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const data = validatedFields.data;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_END_POINT_DIAS}/courses/${courseId}/graduates/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      return { error: res.statusText };
    }

    return { success: "Update Graduates User Successfully!." };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!." };
  }
};

export const deleteUser = async (courseId: string, userId: string) => {
  const session = await getSession();
  const user = session?.user;

  if (!session || !user) {
    redirect(`/api/auth/signin?callbackUrl=/courses/${courseId}`);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_END_POINT_DIAS}/courses/${courseId}/graduates/${userId}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Delete Graduates User Fail!");
    }

    return { success: "Graduates User Delete Successfully!." };
  } catch {
    throw new Error("Something went wrong!.");
  }
};
