import { getUsers } from "@/actions/course";
import { DataTable } from "./data-table";
import { columns } from "./columns";

type UserListProps = {
  courseId: string;
  courseName: string;
};

export const UserList = async ({ courseId, courseName }: UserListProps) => {
  const users = await getUsers(courseId);

  return <DataTable columns={columns} data={users} courseName={courseName} />;
};
