"use client";

import { Step } from "./steps";
import { useCallback, useState } from "react";
import { UIImage } from "@/components/UI/Image";
import { UIButton } from "@/components/UI/Button";
import CreditCardAutoCapture from "@/components/creditCardVerification/dot/CreditCardAutoCapture";

export const CreditCardFront = ({ setStep, data, setData }) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handleCreditCardPhotoTaken = async (imageData, content) => {
    if (imageData?.image) {
      setData({
        ...data,
        card: {
          ...data.card,
          front: imageData.image,
        },
      });
      setStep(Step.CREDITCARD_BACK);
    } else {
      setMessage("Something went wrong, please try again.");
      setError(true);
    }
  };

  const handleError = useCallback((error) => {
    setMessage("Something went wrong, please try again.");
    setError(true);
  }, []);

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
        <h2 className="text-2xl font-bold text-center">
          {"Scan your credit card front side"}
        </h2>
        <h4 className="text-sm font-normal text-slate-600 text-center w-[80%] mt-2">
          {"Instruction: Hold your card in your hand and scan it"}
        </h4>
        <div className="my-4">
          {error ? (
            <div className="flex flex-col items-center my-4">
              <h2 className="text-xl font-semibold text-center mb-4">
                {message}
              </h2>
              <UIButton name="Try again" onClick={() => setError(false)} />
            </div>
          ) : (
            <CreditCardAutoCapture
              onPhotoTaken={handleCreditCardPhotoTaken}
              onError={handleError}
            />
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <p
          className="mt-2 cursor-pointer hover:text-slate-900 hover:underline"
          onClick={() => setStep(Step.INTRODUCTION)}
        >
          Experiencing problem?
        </p>
      </div>
    </div>
  );
};
