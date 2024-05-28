"use server";

import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

export const verifyCert = async (values: object) => {
  try {
    const formData = new FormData();
    formData.append(
      "certificateFile",
      new Blob([JSON.stringify(values)], { type: "application/json" })
    );

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_END_POINT_DIAS}/certificates/verify`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (res.status === 409) {
      return { success: "Certificate is not valid!" };
    }

    if (!res.ok) {
      return { error: res.statusText };
    }

    const result = await res.json();
    if (result.certificate === "revoked") {
      return { success: "Certificate is Revoke!" };
    }

    return { success: "Certificate is Verified!", ...result };
  } catch (error) {
    console.log(error);
    return { error: "Verification Failed!" };
  }
};

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
