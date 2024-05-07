import { Logo } from "@/components/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CourseTypes = {
  course: string;
};

export const Course = ({ course }: CourseTypes) => {
  return (
    <Card className="hover:cursor-pointer">
      <CardHeader className="items-center">
        <CardTitle>
          <Logo />
        </CardTitle>
        {/* <CardDescription>sdfsdfsdfsd</CardDescription> */}
      </CardHeader>
      <CardContent>{course}</CardContent>
      <CardFooter>Free Plan</CardFooter>
    </Card>
  );
};
