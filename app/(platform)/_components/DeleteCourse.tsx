import { deleteCourse } from "@/actions/course";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type DeleteCourseProps = {
  children: React.ReactNode;
  id: string;
};

export const DeleteCourse = ({ children, id }: DeleteCourseProps) => {
  const [_, setSuccess] = useState<string | undefined>("");
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onDelete = async () => {
    startTransition(async () => {
      try {
        const res = await deleteCourse(id);

        if (res.success) {
          setSuccess(res.success);
          toast({
            description: `${res.success}`,
          });
        }
      } catch (error) {
        toast({
          description: "Something went wrong",
          variant: "destructive",
        });
      } finally {
        setOpen(false);
        router.refresh();
      }
    });
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isPending}
      />

      <Button
        variant="ghost"
        className="text-destructive"
        onClick={() => setOpen(true)}
      >
        {children}
      </Button>
    </>
  );
};
