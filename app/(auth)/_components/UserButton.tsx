"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserImage } from "./UserImage";
import Link from "next/link";
import { Loader2, LogOut, Settings } from "lucide-react";
import { SignoutButton } from "./SignoutButton";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { AuthLoading } from "./AuthLoading";

type UserButtonProps = {
  className?: string;
  afterSignOutUrl?: string;
};

export const UserButton = ({ className, afterSignOutUrl }: UserButtonProps) => {
  const session = useSession();
  const user = session.data?.user;

  return (
    <div className={cn(className)}>
      <AuthLoading>
        <Loader2 className="animate-spin duration-500 text-slate-400 ml-2" />
      </AuthLoading>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            {/* {user && <UserImage user={user} />} */}
            <UserImage src={user?.image as string} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <div className="flex items-center justify-around mb-4">
              <div className="ml-2">
                <UserImage src={user?.image as string} />
              </div>
              <div className="mt-2 -space-y-2">
                <DropdownMenuLabel>{user.name || "User"}</DropdownMenuLabel>
                <DropdownMenuLabel className="text-sky-600">
                  {user.email || "User"}
                </DropdownMenuLabel>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="ml-2 my-2">
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer w-full">
                  <Settings className="mr-4" />
                  <span>การตั้งค่า</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="ml-2 mt-4 mb-2">
              <SignoutButton
                afterSignOutUrl={afterSignOutUrl ? afterSignOutUrl : "/"}
              >
                <LogOut className="mr-4" />
                ออกจากระบบ
              </SignoutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
