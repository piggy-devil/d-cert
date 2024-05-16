import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AddUser } from "./AddUser";
import { AddUserSchemaTypes } from "@/schemas";

type EditModalTypes = {
  edit: boolean;
  onClose: () => void;
  courseId: string;
  userId: string;
  values?: AddUserSchemaTypes;
};

export const EditModal = ({
  edit,
  onClose,
  courseId,
  userId,
  values,
}: EditModalTypes) => {
  return (
    <Dialog open={edit} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex justify-center mt-4">
          <AddUser
            isEdit={edit}
            courseId={courseId}
            userId={userId}
            onClose={onClose}
            values={values}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
