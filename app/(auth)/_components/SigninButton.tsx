"use client";

import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";

const SigninButton = () => {
  const session = useSession();
  const user = session.data?.user;

  const pathname = usePathname();

  return (
    <div className="flex ml-auto gap-2">
      {/* <Button variant="ghost" onClick={() => signIn()}>
        Sign In
      </Button>
      <Button>
        <Link href="/sign-up">Get started</Link>
        <ArrowRight className="ml-2" size={14} />
      </Button> */}
      {/* {user && session.status == "authenticated" && (
        <>
          <Button size="sm" asChild variant="ghost">
            <Link href="/courses">Course</Link>
          </Button>
        </>
      )}*/}
      {!user && session.status !== "loading" && pathname !== "/sign-in" ? (
        <>
          <Button variant="ghost" onClick={() => signIn()}>
            Sign In
          </Button>
          <Button>
            <Link href="/sign-up">Get started</Link>
            <ArrowRight className="ml-2" size={14} />
          </Button>
        </>
      ) : (
        <Loader2 className="animate-spin duration-500 text-slate-400" />
      )}
    </div>
  );
};

export default SigninButton;
