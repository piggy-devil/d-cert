"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User2 } from "lucide-react";

type Props = {
  src: string;
};

export const UserImage = ({ src }: Props) => {
  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback className="bg-sky-500">
        <User2 className="text-white" />
      </AvatarFallback>
    </Avatar>
  );
};
