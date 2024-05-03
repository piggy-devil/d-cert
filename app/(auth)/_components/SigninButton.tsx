"use client";

import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { UserButton } from "./UserButton";

const SigninButton = () => {
  const session = useSession();
  const user = session.data?.user;

  const pathname = usePathname();

  return (
    <div className="flex gap-4 ml-auto">
      {user && session.status == "authenticated" && (
        <UserButton user={user} className="mr-4" />
      )}
      {!user && session.status !== "loading" && pathname !== "/sign-in" && (
        <Button onClick={() => signIn()}>Sign In</Button>
      )}
    </div>
  );
};

export default SigninButton;
