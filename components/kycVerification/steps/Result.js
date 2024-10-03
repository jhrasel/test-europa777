"use client";

import { UIButton } from "@/components/UI/Button";
import { Step } from "./steps";
import { UIImage } from "@/components/UI/Image";

export const Result = ({ setStep, data, onCancel }) => {
  const { kyc_status } = data.response || {};
  let title =
    kyc_status === "approved" || kyc_status === "submitted"
      ? "Congratulations"
      : "Please use another identity document";
  if (kyc_status === "already-approved") {
    title = "Already verified";
  }

  let paragraph =
    kyc_status === "approved"
      ? "We primariliy verified your identity, you can get verification update in profile. Now you can close the popup"
      : "Sorry, the identity document you used cannot be verified. Please try again with different identity document";

  if (kyc_status === "submitted") {
    paragraph =
      "Your document sent for verify your profile, you can get verification update in profile. Now you can close the popup";
  }

  if (kyc_status === "already-approved") {
    paragraph =
      "You already verified your account, please close the popup and enjoy!";
  }

  const closeVerification = () => {
    setStep(Step.INTRODUCTION);
    onCancel();
  };

  return (
    <div className="flex flex-col text-slate-700">
      <div className="bg-bg-color1 py-2 rounded-tr-lg">
        <UIImage
          src="/images/logo.png"
          alt="logo"
          className="!w-auto h-6 laptop:h-8 m-auto"
        />
      </div>
      <div className="my-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-center">{title}</h2>
        <h4 className="text-sm font-normal text-slate-600 text-center w-[80%] mt-2">
          {paragraph}
        </h4>
        {kyc_status !== "rejected" ? (
          <div className="flex justify-center my-4">
            <UIButton name="Close" onClick={closeVerification} />
          </div>
        ) : (
          <div className="flex justify-center my-4">
            <UIButton
              name="Try again"
              onClick={() => setStep(Step.INTRODUCTION)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
