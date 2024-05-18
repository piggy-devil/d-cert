import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Certificate } from "./Certificate";
import { AddUserSchemaTypes, CourseDetailTypes } from "@/schemas";
import { getCourse, getUser } from "@/actions/course";
import { Loader2 } from "lucide-react";

type CertFormProps = {
  courseId: string;
  userId: string;
};

export const CertForm = ({ courseId, userId }: CertFormProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [courseData, setCourseData] = useState<CourseDetailTypes | null>(null);
  const [userData, setUserData] = useState<AddUserSchemaTypes | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (isDialogOpen) {
        try {
          const course = await getCourse(courseId);
          const user = await getUser(courseId, userId);
          setCourseData(course);
          setUserData(user);
        } catch (error) {
          console.error("Error fetching data", error);
        }
      }
    };

    fetchData();
  }, [isDialogOpen, courseId, userId]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Cert View</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1150px] w-[1150px] p-6">
        {courseData && userData ? (
          <Certificate
            name={`${userData.titleName} ${userData.firstName} ${userData.lastName}`}
            course={`${courseData.course}`}
            dateOfStudyStart={`${courseData.dateOfStudyStart}`}
            dateOfStudyEnd={`${courseData.dateOfStudyEnd}`}
            signature={courseData.signature}
            signatureDetails="John Smith, Instructor"
          />
        ) : (
          <div className="flex items-center justify-center h-96">
            <Loader2
              className="animate-spin duration-500 text-slate-400"
              size={48}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
