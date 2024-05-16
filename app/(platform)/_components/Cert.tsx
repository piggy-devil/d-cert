import { CertForm } from "./CertForm";

type CertProps = {
  courseId: string;
  userId: string;
};

export const Cert = ({ courseId, userId }: CertProps) => {
  return <CertForm courseId={courseId} userId={userId} />;
};
