"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Cert } from "@/app/(platform)/_components/Cert";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AddUserGraduates = {
  _id: string;
  titleName: string;
  firstName: string;
  lastName: string;
  recipientEmail: string;
  courseId: string;
};

export const columnsViews: ColumnDef<AddUserGraduates>[] = [
  {
    accessorKey: "titleName",
    header: "คำนำหน้า",
  },
  {
    accessorKey: "firstName",
    header: "ชื่อตัว",
  },
  {
    accessorKey: "lastName",
    header: "ชื่อสกุล",
  },
  {
    accessorKey: "recipientEmail",
    header: "อีเมล",
  },
  {
    id: "cert",
    header: "Viewer",
    cell: ({ row }) => {
      const user = row.original;

      return <Cert courseId={user.courseId} userId={user._id} />;
    },
  },
];
