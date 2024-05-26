"use server";

import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

export const revoke = async (certificateUUID: string, courseId: string) => {
  const session = await getSession();
  const user = session?.user;

  if (!session || !user) {
    redirect(`/api/auth/signin?callbackUrl=/courses/${courseId}/graduates`);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_END_POINT_DIAS}/certificates/${certificateUUID}/revoke`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to revoke certificate.");
    }

    return { success: "Certificate Revoke Successfully!." };
  } catch {
    throw new Error("Something went wrong!.");
  }
};
