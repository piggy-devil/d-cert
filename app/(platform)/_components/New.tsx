"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Hint } from "@/components/util/Hint";
import { CirclePlus, Plus } from "lucide-react";
import { CreateCourseForm } from "../courses/_components/CreateCourseForm";
import { useState } from "react";

type NewButtonProps = {
  children?: React.ReactNode;
};

export const NewButton = ({ children }: NewButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFormSubmit = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="w-full h-full">
          <Hint label="Create Cert" side="top" align="end" sideOffset={18}>
            {children ? (
              <div className="flex items-center cursor-pointer hover:bg-primary hover:text-white px-2 py-2 mb-4 rounded-md">
                <CirclePlus size={20} className="mr-4" />
                {children}
              </div>
            ) : (
              <button className="bg-slate-200 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100transition">
                <Plus className="text-white hover:text-primary w-12 h-12" />
              </button>
            )}
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
        <CreateCourseForm onClose={handleFormSubmit} />
      </DialogContent>
    </Dialog>
  );
};
