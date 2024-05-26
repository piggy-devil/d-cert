"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsisVertical, X } from "lucide-react";

import Link from "next/link";
import { EditCourse } from "./EditCourse";
import { DeleteCourse } from "./DeleteCourse";
import { useState } from "react";
import { PopoverClose } from "@radix-ui/react-popover";
import { CourseLogo } from "./CourseLogo";
import { CourseDetailTypes } from "@/schemas";
import { getColorClass, getColorHeaderCourse } from "@/lib/hint";

type CourseTypes = {
  course: CourseDetailTypes;
};

export const Course = ({ course }: CourseTypes) => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden relative">
      <div
        className={`h-5 w-full rounded-t-md ${getColorHeaderCourse(
          course.issueStatus
        )} absolute`}
      />
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <Link
            href={`/courses/${course._id}`}
            className={getColorClass(course.issueStatus)}
          >
            <CourseLogo status={course.issueStatus} />
          </Link>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
              <EllipsisVertical className="text-slate-500 hover:text-slate-900" />
            </PopoverTrigger>
            {/* <PopoverContent className="-translate-x-10 w-48"> */}
            <PopoverContent className="w-48">
              <PopoverClose className="float-end">
                <X size={18} />
              </PopoverClose>
              <div className="flex flex-col space-y-2 w-full mt-8">
                <EditCourse
                  course={course}
                  onClose={onClose}
                  disabled={course.issueStatus === "P" ? false : true}
                />
                <DeleteCourse
                  id={course._id}
                  disabled={course.issueStatus === "I" ? true : false}
                >
                  Delete
                </DeleteCourse>
              </div>
            </PopoverContent>
          </Popover>
        </CardTitle>
        {/* <CardDescription>sdfsdfsdfsd</CardDescription> */}
      </CardHeader>
      <CardContent>
        <Link
          className="hover:cursor-pointer"
          href={`/courses/${course._id}`}
          passHref
        >
          <div>{course.course}</div>
        </Link>
      </CardContent>
      <CardFooter className="mt-auto flex justify-end text-slate-500 text-sm translate-y-4">
        Free Plan
      </CardFooter>
    </Card>
  );
};
