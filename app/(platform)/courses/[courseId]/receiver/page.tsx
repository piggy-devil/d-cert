import { AddUser } from "@/app/(platform)/_components/AddUser";
import { UserList } from "./_components/user-list";

type ReceiverPageProps = {
  params: { courseId: string };
};

const ReceiverPage = ({ params }: ReceiverPageProps) => {
  const courseId = params.courseId;
  return (
    <div className="flex flex-row space-x-4">
      <div className="flex-1 overflow-y-auto max-h-screen">
        <UserList courseId={courseId} />
      </div>
      <div className="w-1/3">
        <AddUser courseId={courseId} />
      </div>
    </div>
  );
};

export default ReceiverPage;
