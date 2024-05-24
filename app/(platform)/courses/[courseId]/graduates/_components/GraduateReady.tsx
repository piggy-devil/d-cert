"use client";

import { updateCourse } from "@/actions/course";
import { ReadyModal } from "@/components/modals/ready-modal";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { CourseDetailSchemaTypes } from "@/schemas";
import { Loader2 } from "lucide-react";
import { getColorHeaderCourse, getHintLabel } from "@/lib/hint";
import { cn } from "@/lib/utils";

type GraduateReadyProps = {
  courseId: string | undefined;
  course: CourseDetailSchemaTypes;
  count?: number;
};

export const GraduateReady = ({
  courseId,
  course,
  count,
}: GraduateReadyProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onStatusChange = () => {
    setOpen(false);
    startTransition(async () => {
      try {
        const updatedCourse = {
          ...course,
          issueStatus: course.issueStatus === "P" ? "R" : "P",
          dateOfStudyStart: new Date(course.dateOfStudyStart),
          dateOfStudyEnd: new Date(course.dateOfStudyEnd),
          dateOfExpireCert: course.dateOfExpireCert
            ? new Date(course.dateOfExpireCert)
            : undefined,
        };

        const res = await updateCourse(updatedCourse, courseId as string);

        if (res.success) {
          let toastMessage = "";

          switch (course.issueStatus) {
            case "P":
              toastMessage = "All Information Ready To Blockchain";
              break;
            case "R":
              toastMessage = "All Information Back To Prepare Information";
              break;
            case "I":
              toastMessage = "Information Incomplete on Blockchain";
              break;
            default:
              toastMessage = "All Information Success";
              break;
          }

          toast({
            description: toastMessage,
          });

          router.refresh();
        } else if (res.error) {
          toast({
            description: res.error,
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    });
  };
  return (
    <div>
      <ReadyModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onStatusChange}
        loading={isPending}
        status={course.issueStatus}
      />
      <Button
        variant="outline"
        className={cn(
          "w-60 py-6 mt-2 text-white",
          `${getColorHeaderCourse(course.issueStatus)}`,
          course.issueStatus === "I" && "cursor-not-allowed"
        )}
        onClick={() => {
          count
            ? course.issueStatus !== "I" && count > 0 && setOpen(true)
            : course.issueStatus !== "I" && setOpen(true);
        }}
        disabled={isPending || count || 0 > 0 ? false : true}
        // disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="animate-spin duration-500 text-slate-400" />
        ) : (
          course && getHintLabel(course.issueStatus)
        )}
      </Button>
    </div>
  );
};
