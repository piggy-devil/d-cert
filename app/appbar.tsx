import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";
import React from "react";
import SigninButton from "./(auth)/_components/SigninButton";
import getSession from "@/lib/getSession";

export const Appbar = async () => {
  const session = await getSession();

  return (
    <div className="p-2 bg-gradient-to-b from-slate-800 to-slate-600 flex gap-2 ">
      <Link href={"/client"}>Client Page</Link>
      <Link href={"/server"}>Server Page</Link>
      <Link href={"/middle"}>Middleware Protected Page</Link>
      <div className="ml-auto">
        {/* {session && session.user ? (
          <div className="flex gap-2">
            <p>{session.user.name}</p>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button type="submit">Sign Out</button>
            </form>
          </div>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn();
            }}
          >
            <button type="submit">Sign In</button>
          </form>
        )} */}
        <SigninButton />
      </div>
    </div>
  );
};
