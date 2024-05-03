"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User2 } from "lucide-react";
import { User } from "next-auth";

type UserImageProps = {
  user: User;
};

export const UserImage = ({ user }: UserImageProps) => {
  return (
    <Avatar>
      <AvatarImage src={user?.image || ""} />
      <AvatarFallback className="bg-sky-500">
        <User2 className="text-white" />
      </AvatarFallback>
    </Avatar>
  );
};
