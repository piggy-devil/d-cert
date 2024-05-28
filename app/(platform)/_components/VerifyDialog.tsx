"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Certificate } from "./Certificate";
import { cn } from "@/lib/utils";

type CertificateData = {
  [key: string]: any; // รองรับฟิลด์ที่ไม่แน่นอน
};

type CertState = {
  success?: string;
  certificate?: string;
  certificateData?: CertificateData;
};

type VerifyDialogTypes = {
  cert: CertState;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const VerifyDialog = ({ cert, open, setOpen }: VerifyDialogTypes) => {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent
        className={cert.certificate ? "max-w-[1150px] w-[1150px] p-6" : "py-20"}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center">
            <span
              className={cn(
                "px-4 py-3 text-3xl text-white rounded-md",
                cert.certificate ? "bg-green-500 text-xl" : "bg-destructive"
              )}
            >
              {cert.success}
            </span>
          </DialogTitle>
          <DialogDescription asChild>
            <div className="flex items-center justify-center">
              {
                cert.certificateData && (
                  <Certificate
                    name={`${cert.certificateData.titleName}${cert.certificateData.firstName} ${cert.certificateData.lastName}`}
                    course={`${cert.certificateData.course}`}
                    dateOfStudyStart={`${cert.certificateData.dateOfStudyStart}`}
                    dateOfStudyEnd={`${cert.certificateData.dateOfStudyEnd}`}
                    signature={`${cert.certificateData.signature.contentType},${cert.certificateData.signature.data}`}
                    signatureDetails="John Smith, Instructor"
                    stampImageUrl="/verified.png"
                  />
                )
                //   : (
                //     <Image
                //       src="/cancel.png"
                //       alt="Stamp"
                //       className="w-full"
                //       width={192}
                //       height={192}
                //     />
                //   )
              }
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
