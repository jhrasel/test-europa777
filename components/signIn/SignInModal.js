"use client";

import { Modal } from "antd";

import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { H2, UIImage } from "../UI";
import { SignInForm } from "./SignInForm";

const SignInModal = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("Common");
  const searchParams = useSearchParams();

  const modalName = searchParams.get("modal") || null;

  useEffect(() => {
    if (modalName === "sign-in") {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [modalName]);

  const onCancel = () => {
    router.push(pathname);
  };

  const handleLoginSuccess = () => {
    onCancel();
  };

  return (
    <Modal
      open={isModalOpen}
      centered
      onCancel={onCancel}
      className="!w-[90%] tab:!w-[400px]"
      footer={null}
    >
      <div className="p-5 pt-10">
        <div className="mb-4 bg-bg-color1 py-2 rounded-lg">
          <UIImage
            src="/images/logo.png"
            alt="logo"
            className="!w-auto h-6 laptop:h-8 m-auto"
          />
        </div>
        <H2 name={t("Sign In")} className="!text-bg-color1 text-center" />

        {/* Login Data */}
        <div className="mt-2">
          <SignInForm
            onLoginSuccess={handleLoginSuccess}
            onForgotPassword={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default SignInModal;
