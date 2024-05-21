"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { ShieldCheckIcon } from "lucide-react";
import { CreateCourseForm } from "../courses/_components/CreateCourseForm";
import { useState } from "react";

export const EmptyCourse = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFormSubmit = () => {
    setIsOpen(false);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <ShieldCheckIcon className="w-40 h-40 fill-green-500 text-green-900" />
      <h2 className="text-2xl font-semibold mt-6">
        Welcome to Blockchain certified issuance system.
      </h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a certified for your course
      </p>
      <div className="mt-6">
        {/* <Button size="lg">Create course</Button> */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="lg">สร้างหลักสูตร</Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
            <CreateCourseForm onClose={handleFormSubmit} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
