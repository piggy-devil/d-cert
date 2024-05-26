"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { EditCourseForm } from "./EditCourseForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type EditCourseTypes = {
  course: any;
  onClose: () => void;
  disabled: boolean;
};

export const EditCourse = ({ course, onClose, disabled }: EditCourseTypes) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild disabled={disabled}>
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => setOpen(true)}
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
        <EditCourseForm course={course} id={course._id} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};
