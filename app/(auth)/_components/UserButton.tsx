import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "next-auth";
import { UserImage } from "./UserImage";
import Link from "next/link";
import { LogOut, Settings } from "lucide-react";
import { SignoutButton } from "./SignoutButton";
import { cn } from "@/lib/utils";

type UserButtonProps = {
  user: User;
  className?: string;
};

export const UserButton = ({ user, className }: UserButtonProps) => {
  return (
    <div className={cn(className)}>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <UserImage user={user} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <div className="flex items-center justify-around mb-4">
            <div className="ml-2">
              <UserImage user={user} />
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
              <Link href="/client">
                <Settings className="mr-4" />
                <span className="cursor-pointer">การตั้งค่า</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="ml-2 mt-4 mb-2">
            <LogOut className="mr-4" />
            <SignoutButton>ออกจากระบบ</SignoutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
