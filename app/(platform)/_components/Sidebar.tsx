import getSession from "@/lib/getSession";
import { CreateProjForm } from "./CreateProjForm";
import { Institute } from "./Institute";
import { getInstitutes } from "@/actions/institutes";

type SidebarProps = {
  courseId?: string;
};

export const Sidebar = async ({ courseId }: SidebarProps) => {
  const session = await getSession();
  const user = session?.user;
  let institute = null;
  if (user?.role == "issuer") {
    institute = await getInstitutes(user?.instituteId as string);
  }

  return (
    <div className="space-y-2 mt-4">
      {!!institute && <Institute name={institute[0].instituteName} />}
      <CreateProjForm user={user} courseId={courseId} />
    </div>
  );
};
