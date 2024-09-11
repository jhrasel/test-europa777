"use client";

import { Modal } from "antd";

import { H3 } from "@/components/UI";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Deposit } from "./Deposit";

export const QuickDepositModal = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("Common");
  const searchParams = useSearchParams();

  const modalName = searchParams.get("modal") || null;

  useEffect(() => {
    if (modalName === "quick-deposit") {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [modalName]);

  const onCancel = () => {
    router.push(pathname);
  };

  return (
    <Modal
      open={isModalOpen}
      centered
      onCancel={onCancel}
      className="!w-[95%] tab:!w-auto"
      footer={null}
    >
      <div className="deposit-modal bg-[#2B2740] rounded">
        <H3 name="Quick Deposit" className="text-center pt-3" />

        <Deposit />
      </div>
    </Modal>
  );
};
