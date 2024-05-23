"use client";

import { updateCourse } from "@/actions/course";
import { ReadyModal } from "@/components/modals/ready-modal";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { CourseDetailSchemaTypes } from "@/schemas";
import { Loader2 } from "lucide-react";
import { getBtnReadyBlock } from "@/lib/hint";

type GraduateReadyProps = {
  courseId: string | undefined;
  course: CourseDetailSchemaTypes;
  count: number;
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
          dateOfExpireCert: new Date(course.dateOfExpireCert || ""),
        };

        const res = await updateCourse(updatedCourse, courseId as string);

        if (res.success) {
          toast({
            description: "All Information Ready To Blockchain",
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
        status={course.issueStatus || "P"}
      />
      <Button
        variant="outline"
        className={getBtnReadyBlock(course.issueStatus || "P")}
        onClick={() => setOpen(true)}
        disabled={isPending || count > 0 ? false : true}
      >
        {isPending ? (
          <Loader2 className="animate-spin duration-500 text-slate-400" />
        ) : course && course.issueStatus === "P" ? (
          "Prepare information"
        ) : (
          "Ready For Blockchain"
        )}
      </Button>
    </div>
  );
};
