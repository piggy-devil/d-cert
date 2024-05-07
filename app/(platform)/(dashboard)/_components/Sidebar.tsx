import { CreateProjForm } from "./CreateProjForm";
import getSession from "@/lib/getSession";

export const Sidebar = async () => {
  const session = await getSession();
  const user = session?.user;

  return (
    <div>
      <CreateProjForm user={user} />
    </div>
  );
};
