import { getUser } from "@/actions/course";
import { DataTable } from "./data-table";
import { columns } from "./columns";

type UserListProps = {
  courseId: string;
};

export const UserList = async ({ courseId }: UserListProps) => {
  const users = await getUser(courseId);

  return <DataTable columns={columns} data={users} />;
};
