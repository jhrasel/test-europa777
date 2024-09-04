"use client";

import { Step } from "./steps";
import { useCallback, useState } from "react";
import useApi from "@/helpers/apiRequest";
import { UIImage } from "@/components/UI/Image";
import { UIButton } from "@/components/UI/Button";
import DocumentAutoCapture from "@/components/kycVerification/dot/DocumentAutoCapture";

export const DocumentBack = ({ setStep, data, setData }) => {
  const { fetchData, isLoading } = useApi();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handleDocumentPhotoTaken = async (imageData, content) => {
    const formData = new FormData();
    formData.append("photo", imageData.image);

    const { data: result, error: errorRes } = await fetchData(
      "/kyc/verifyBackDocument",
      "POST",
      formData,
      null,
      { "Content-Type": "multipart/form-data" }
    );
    if (errorRes || !result?.data) {
      setMessage("Something went wrong, please try again.");
      setError(true);
      return;
    }

    const response = result.data;

    if (response.valid) {
      setData({
        ...data,
        document: {
          ...data.document,
          back: {
            ...data.document.back,
            request: imageData.image,
            response: response,
          },
        },
      });
      setStep(Step.SELFIE);
    } else {
      setMessage(
        "The document could not be scanned properly. Please try again"
      );
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
          {`Turn your ${
            data.document.front.response?.type || "document"
          } around`}
        </h2>
        <h4 className="text-sm font-normal text-slate-600 text-center w-[80%] mt-2">
          {`Turn your ${
            data.document.front.response?.type || "document"
          } around and scan the other side`}
        </h4>
        <div className="my-4">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              {error ? (
                <div className="flex flex-col items-center my-4">
                  <h2 className="text-xl font-semibold text-center mb-4">
                    {message}
                  </h2>
                  <UIButton name="Try again" onClick={() => setError(false)} />
                </div>
              ) : (
                <DocumentAutoCapture
                  onPhotoTaken={handleDocumentPhotoTaken}
                  onError={handleError}
                />
              )}
            </>
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
