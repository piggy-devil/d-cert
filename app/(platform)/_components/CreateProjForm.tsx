import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown, User2 } from "lucide-react";
import { User } from "next-auth";
import { NewButton } from "./New";
import { CourseSideList } from "../courses/_components/CourseSideList";
import { getMeCourse } from "@/actions/course";

type CreateProjFormProps = {
  user: User | undefined;
  courseId: string | undefined;
};

export const CreateProjForm = async ({
  user,
  courseId,
}: CreateProjFormProps) => {
  const courses = await getMeCourse();

  return (
    <div className="font-medium flex items-center mb-1">
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
            <NewButton>หลักสูตร</NewButton>
            {courses && (
              <CourseSideList courses={courses} currentCourseId={courseId} />
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
