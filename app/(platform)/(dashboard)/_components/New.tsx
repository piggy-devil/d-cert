"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Hint } from "@/components/util/Hint";
import { Plus } from "lucide-react";
import { CreateCourseForm } from "./CreateCourseForm";

export const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <Hint label="Create Cert" side="right" align="start" sideOffset={18}>
            <button className="bg-slate-200 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
              <Plus className="text-white" />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
        <CreateCourseForm />
      </DialogContent>
    </Dialog>
  );
};
