"use client";

import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { UserButton } from "./UserButton";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const SigninButton = () => {
  const session = useSession();
  const user = session.data?.user;

  const pathname = usePathname();

  return (
    <div className="flex ml-auto">
      {user && session.status == "authenticated" && (
        <>
          <Button size="sm" asChild variant="ghost">
            <Link href="/dashboard">dashboard</Link>
          </Button>
          <UserButton user={user} className="mr-4" />
        </>
      )}
      {!user && session.status !== "loading" && pathname !== "/sign-in" && (
        <>
          <Button variant="ghost" onClick={() => signIn()}>
            Sign In
          </Button>
          <Button>
            <Link href="/sign-up">Get started</Link>
            <ArrowRight className="ml-2" size={14} />
          </Button>
        </>
      )}
    </div>
  );
};

export default SigninButton;
