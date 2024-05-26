/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Cert } from "@/app/(platform)/_components/Cert";
import { ShieldAlert, ShieldCheck, ShieldX, Trash2 } from "lucide-react";
import { Hint } from "@/components/util/Hint";
import { AlertModal } from "@/components/modals/alert-modal";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { revoke } from "@/actions/certificate";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AddUserGraduates = {
  _id: string;
  titleName: string;
  firstName: string;
  lastName: string;
  recipientEmail: string;
  courseId: string;
  certificateUUID: string;
  certificateRevoked: string;
};

export const columnsViews: ColumnDef<AddUserGraduates>[] = [
  {
    id: "verify",
    header: "Status",
    cell: ({ row }) => {
      const user = row.original;

      if (!user.certificateUUID && !user.certificateRevoked)
        return (
          <Hint
            label="Waiting"
            className="bg-yellow-500 border-white mb-1 ml-2"
            align="start"
          >
            <ShieldAlert className="fill-yellow-300 text-yellow-500" />
          </Hint>
        );

      if (user.certificateUUID && !user.certificateRevoked)
        return (
          <Hint
            label="Verified"
            className="bg-green-500 border-white mb-1 ml-2"
            align="start"
          >
            <ShieldCheck className="fill-green-300 text-green-500" />
          </Hint>
        );

      if (user.certificateUUID && user.certificateRevoked)
        return (
          <Hint
            label="Revoked"
            className="bg-orange-500 border-white mb-1 ml-2"
            align="start"
          >
            <ShieldX className="fill-orange-300 text-orange-500" />
          </Hint>
        );
    },
  },
  {
    id: "username",
    header: "ชื่อ-สกุล",
    cell: ({ row }) => {
      const user = row.original;
      let username = `${user.titleName}${user.firstName} ${user.lastName}`;

      return username;
    },
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
  {
    id: "revoke",
    header: "Revoke",
    cell: ({ row }) => {
      const user = row.original;
      const [open, setOpen] = useState(false);
      const [isPending, startTransition] = useTransition();
      const router = useRouter();

      const onRevoke = () => {
        startTransition(async () => {
          try {
            const res = await revoke(user.certificateUUID, user.courseId);

            if (res.success) {
              toast({
                description: `${res.success}`,
              });

              router.refresh();
              setOpen(false);
            }
          } catch (error) {
            toast({
              variant: "destructive",
              description: "Something went wrong",
            });
            setOpen(false);
          }
        });
      };

      if (user.certificateUUID && user.certificateRevoked) {
        return <Trash2 size={20} className="text-orange-500 opacity-50" />;
      }

      if (user.certificateUUID && !user.certificateRevoked) {
        return (
          <div>
            <AlertModal
              isOpen={open}
              onClose={() => setOpen(false)}
              onConfirm={onRevoke}
              loading={isPending}
            />
            <Hint
              label="Revoked"
              className="bg-orange-500 border-white mb-1 ml-2"
              align="start"
            >
              <Trash2
                onClick={() => setOpen(true)}
                className="text-orange-500 hover:text-white hover:fill-orange-500"
                size={20}
              />
            </Hint>
          </div>
        );
      }
    },
  },
];
