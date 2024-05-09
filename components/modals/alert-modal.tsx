"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Modal } from "../Modal";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  loading?: boolean;
}

export const AlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}: AlertModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="คุณแน่ใจใช่หรือไม่?"
      description="เมื่อดำเนินการแล้วจะไม่สามารถย้อนกลับได้"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          ยกเลิก
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          ตกลง
        </Button>
      </div>
    </Modal>
  );
};
