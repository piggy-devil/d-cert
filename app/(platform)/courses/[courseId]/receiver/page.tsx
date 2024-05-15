import { AddUser } from "@/app/(platform)/_components/AddUser";

type ReceiverPageProps = {
  params: { courseId: string };
};

const ReceiverPage = ({ params }: ReceiverPageProps) => {
  return (
    <div>
      <AddUser courseId={params.courseId} />
    </div>
  );
};

export default ReceiverPage;
