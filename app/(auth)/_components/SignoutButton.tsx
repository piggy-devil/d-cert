"use client";

import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

interface LogoutButtonProps {
  children?: React.ReactNode;
  afterSignOutUrl?: string;
  classname?: string;
}

export const SignoutButton = ({
  children,
  afterSignOutUrl,
  classname,
}: LogoutButtonProps) => {
  return (
    <span
      onClick={() =>
        signOut({ callbackUrl: afterSignOutUrl ? afterSignOutUrl : "/sign-in" })
      }
      className={cn("flex cursor-pointer w-full", classname)}
    >
      {children}
    </span>
  );
};
