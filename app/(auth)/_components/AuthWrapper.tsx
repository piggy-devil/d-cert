"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BackButton } from "./BackButton";
import { getColorHeaderCourse } from "@/lib/hint";

type AuthWrapperProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  status?: string;
};

export const AuthWrapper = ({
  children,
  title,
  description,
  backButtonLabel,
  backButtonHref,
  status,
}: AuthWrapperProps) => {
  return (
    <Card className="w-full max-w-[400px] mx-3 relative">
      {status && (
        <div
          className={`h-5 w-full rounded-t-md ${getColorHeaderCourse(
            status
          )} absolute`}
        />
      )}
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex justify-between">
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};
