"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Modal } from "../Modal";
import { Loader2 } from "lucide-react";

interface ReadyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  loading?: boolean;
  status: string;
}

export const ReadyModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  status,
}: ReadyModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={
        status === "P"
          ? "ข้อมูลที่ใช้ในการออกใบเซอร์ถูกต้องสมบูรณ์แล้ว?"
          : "ข้อมูลมีการเปลี่ยนแปลง?"
      }
      description={
        status === "P"
          ? 'กด "ตกลง" เพื่อรอนำข้อมูลเข้าสู่ระบบบล็อกเชนต่อไป'
          : 'กด "ตกลง" เพื่อออกจาก สถานะ รอนำข้อมูลเข้าสู่ระบบบล็อกเชน'
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          ยกเลิก
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          {loading ? (
            <Loader2 className="animate-spin duration-500 text-slate-400" />
          ) : (
            "ตกลง"
          )}
        </Button>
      </div>
    </Modal>
  );
};
