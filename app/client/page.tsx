"use client";

import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();
  if (!session || !session.user)
    return <div className="text-red-500 mt-20 p-5">You Need To Sign In</div>;
  return <div className="mt-20">This is a client P and must be protected</div>;
};

export default Page;
