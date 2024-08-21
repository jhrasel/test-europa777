"use client";

import { Modal } from "antd";

import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { H4, H5, P, UIButton } from "../UI";

export const DuplicateAccountModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Common");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();

  const modalName = searchParams.get("modal") || null;
  const email = searchParams.get("email") || null;

  useEffect(() => {
    if (modalName === "duplicate-user") {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [modalName]);

  const onCancel = () => {
    router.push(pathname);
  };

  const handleLogin = () => {
    router.push(pathname + "?modal=sign-in");
  };

  return (
    <Modal
      open={isModalOpen}
      centered
      onCancel={onCancel}
      className="!w-[90%] tab:!w-[400px]"
      footer={null}
    >
      <div className="p-5 tab:p-10 text-center flex flex-col gap-2">
        <H4 name="Duplicate Accounts" className="text-bg-color2" />
        <P
          name="We're sorry, It appears you have a duplicate account.
                            You can have only one account
                            Please using the following email address:"
        />
        <H5 name={email} className="!text-blue-color" />
        <UIButton
          name={t("Sign In")}
          onClick={handleLogin}
          className={`bg-blue-color mt-2`}
        />
      </div>
    </Modal>
  );
};
