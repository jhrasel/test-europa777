"use client";

import { Modal } from "antd";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { H2, UIImage } from "../UI";
import BonusRegister from "./BonusRegister";
import { SignUpFormWrapper } from "./SignUpFormWrapper";

const SignUpModal = () => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const goToStep2 = () => {
    setStep(2);
  };

  const router = useRouter();
  const pathname = usePathname();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("Common");
  const searchParams = useSearchParams();

  const modalName = searchParams.get("modal") || null;

  useEffect(() => {
    if (modalName === "sign-up") {
      setIsModalOpen(true);
      setIsOpen(true);
    } else {
      setIsModalOpen(false);
      setIsOpen(false);
      setStep(1);
    }
  }, [modalName]);

  const onCancel = () => {
    router.push(pathname);
    setIsOpen(false);
    setStep(1);
  };

  const handleSignUpSuccess = () => {
    onCancel();
  };

  return (
    <>
      {step === 1 && (
        <BonusRegister
          goToStep2={goToStep2}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      {step === 2 && (
        <Modal
          open={isModalOpen}
          centered
          onCancel={onCancel}
          className="!w-[90%] tab:!w-[900px] h-[70%] tab:h-auto"
          footer={null}
        >
          <div className="">
            <div className="grid grid-cols-1 tab:grid-cols-2 items-start tab:-mb-6">
              {/* img */}
              <div className="hidden tab:block bg-[#2417B9] rounded-l-lg h-full">
                <div className="img rounded-l-lg h-full">
                  <UIImage
                    src="/images/Signup.png"
                    alt="Signup"
                    className=" !h-full object-contain m-auto rounded-l-lg"
                  />
                </div>
              </div>

              {/* form */}
              <div className="w-full rounded-tr-lg ">
                <div className="mb-4 bg-bg-color1 py-2 rounded-tr-lg">
                  <UIImage
                    src="/images/logo.png"
                    alt="logo"
                    className="!w-auto h-6 laptop:h-8 m-auto"
                  />
                </div>

                <H2
                  name={t("Sign Up")}
                  className="!text-bg-color1 text-center"
                />
                {/* signup Form */}
                <div className="mt-2 pt-0 pb-4 px-5 ">
                  <SignUpFormWrapper
                    handleSignUpSuccess={handleSignUpSuccess}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default SignUpModal;
