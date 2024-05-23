/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Copy, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteUser } from "@/actions/course";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { useState, useTransition } from "react";
import { EditModal } from "@/app/(platform)/_components/EditModal";
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

export const columns: ColumnDef<AddUserGraduates>[] = [
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
    header: "GenCert",
    cell: ({ row }) => {
      const user = row.original;

      return <Cert courseId={user.courseId} userId={user._id} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      const router = useRouter();
      const [open, setOpen] = useState(false);
      const [edit, setEdit] = useState(false);
      const [isPending, startTransition] = useTransition();

      const onDelete = async () => {
        startTransition(async () => {
          try {
            const res = await deleteUser(user.courseId, user._id);

            if (res.success) {
              toast({
                variant: "destructive",
                description: `${res.success}`,
              });

              router.refresh();
              setOpen(false);
            }
          } catch (error) {
            console.log("Something went wrong");
          }
        });
      };

      const handleEditClose = () => {
        setEdit(false);
      };

      const values = {
        titleName: user.titleName,
        firstName: user.firstName,
        lastName: user.lastName,
        recipientEmail: user.recipientEmail,
      };

      return (
        <DropdownMenu>
          <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading={isPending}
          />

          <EditModal
            edit={edit}
            onClose={handleEditClose}
            courseId={user.courseId}
            userId={user._id}
            values={values}
          />

          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => navigator.clipboard.writeText(user._id)}
            >
              <Copy size={18} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => setEdit(true)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => setOpen(true)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
