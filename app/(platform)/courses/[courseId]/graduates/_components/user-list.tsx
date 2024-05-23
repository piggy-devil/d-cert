import { getUsers } from "@/actions/course";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { columnsViews } from "./columns-views";

type UserListProps = {
  courseId: string;
  courseStatus: string;
};

export const UserList = async ({ courseId, courseStatus }: UserListProps) => {
  const users = await getUsers(courseId);

  if (courseStatus === "P" || courseStatus === "E")
    return <DataTable columns={columns} data={users} />;

  return <DataTable columns={columnsViews} data={users} />;
};
