"use client";

import { Medal } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";

export const Welcome = () => {
  const { isLoaded } = useUser();
  return (
    <div className="flex flex-col items-center justify-center px-100 pt-24">
      <div className="flex items-center justify-center flex-col">
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-2" />
          No 1 Certificate managment
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          Digital Certificate Platform
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-blue-700 to-blue-400 text-white px-4 p-2 rounded-md pb-4 w-fit">
          Blockchain Technology
        </div>
      </div>
      <div className="text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto">
        Create digital credentials in minutes with our easy-to-use certificate
        base on Blockchain Technology.
      </div>
      {!isLoaded && (
        <Button className="mt-6 px-6" size="sm" asChild>
          <Link href="/sign-up">Start for free</Link>
        </Button>
      )}
    </div>
  );
};
