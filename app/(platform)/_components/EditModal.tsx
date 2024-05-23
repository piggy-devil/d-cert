"use client";

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
  // const [course, setCourse] = useState<CourseDetailTypes | null>(null);

  // useEffect(() => {
  //   const getCourseDetails = async () => {
  //     if (courseId) {
  //       const courseData = await getCourse(courseId);
  //       setCourse(courseData);
  //     }
  //   };

  //   getCourseDetails();
  // }, [courseId]);

  // if (!course) {
  //   return <Loader2 className="animate-spin duration-500 text-slate-400" />;
  // }

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
            // issueStatus={course.issueStatus}
            issueStatus="P"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
