"use client";

import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

interface LogoutButtonProps {
  children?: React.ReactNode;
  callbackUrl?: string;
  classname?: string;
}

export const SignoutButton = ({
  children,
  callbackUrl,
  classname,
}: LogoutButtonProps) => {
  return (
    <span
      onClick={() => signOut({ callbackUrl: callbackUrl ? callbackUrl : "/" })}
      className={cn("cursor-pointer", classname)}
    >
      {children}
    </span>
  );
};
