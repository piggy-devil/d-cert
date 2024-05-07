import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select, SelectTrigger } from "@/components/ui/select";
import { ChevronsUpDown, CirclePlus, Plus, User2 } from "lucide-react";
import { User } from "next-auth";
import Link from "next/link";

type CreateProjFormProps = {
  user: User | undefined;
};

export const CreateProjForm = ({ user }: CreateProjFormProps) => {
  return (
    <div className="font-medium flex items-center mb-1">
      {/* <span>Workspaces</span> */}

      {/* <Select>
        <SelectTrigger className="w-[180px]">xxxx</SelectTrigger>
      </Select> */}

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-60 py-6 hover:bg-white">
            <div className="flex items-center justify-between w-60">
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage src={user?.image as string} />
                  <AvatarFallback>
                    <User2 />
                  </AvatarFallback>
                </Avatar>
                <span className="mx-2">{user?.name}</span>
              </div>
              <ChevronsUpDown size={18} className="ml-auto" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-60">
          <div className="font-medium text-center text-gray-600 pb-2 text-sm">
            <Button
              variant="ghost"
              className="flex justify-between w-full cursor-pointer"
            >
              <CirclePlus size={20} />
              <Link href="/">Create Organiztion</Link>
            </Button>
          </div>
          {/* <form action={handleSubmit}>
            <div>
              <ImagesForm name="image" />
              <InputForm id="title" label="Organization Title" type="text" />
              <FormSubmit className="w-full mt-2">Create Org</FormSubmit>
            </div>
          </form> */}
        </PopoverContent>
      </Popover>
    </div>
  );
};
