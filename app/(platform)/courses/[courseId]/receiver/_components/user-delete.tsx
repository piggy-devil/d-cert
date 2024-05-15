import { deleteUser } from "@/actions/course";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type UserDeleteProps = {
  children: React.ReactNode;
  userId: string;
  courseId: string;
};

export const UserDelete = ({ children, userId, courseId }: UserDeleteProps) => {
  const [_, setSuccess] = useState<string | undefined>("");
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onDelete = async () => {
    startTransition(async () => {
      try {
        const res = await deleteUser(courseId, userId);
        console.log("res: ", res);

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
        // router.refresh();
        // setOpen(false);
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
