"use client";

import { Logo } from "@/components/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type CourseTypes = {
  course: any;
};

export const Course = ({ course }: CourseTypes) => {
  return (
    <Card className="w-full h-full overflow-hidden">
      <CardHeader className="items-center">
        <CardTitle>
          <Logo href={`/courses/${course._id}`} />
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
      <CardFooter>Free Plan</CardFooter>
    </Card>
  );
};
