import { deleteCourse } from "@/actions/course";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type DeleteCourseProps = {
  children: React.ReactNode;
  id: string;
  className?: string;
  afterDelete?: string;
};

export const DeleteCourse = ({
  children,
  id,
  className,
  afterDelete,
}: DeleteCourseProps) => {
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
        router.refresh();
        {
          afterDelete && router.push(`${afterDelete}`);
        }
        setOpen(false);
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
        className={cn("text-destructive", className)}
        onClick={() => setOpen(true)}
      >
        {isPending ? (
          <Loader2 className="animate-spin duration-500 text-slate-400" />
        ) : (
          children
        )}
      </Button>
    </>
  );
};
