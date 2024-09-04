"use client";

import { Step } from "./steps";
import { useCallback, useState } from "react";
import useApi from "@/helpers/apiRequest";
import { UIImage } from "@/components/UI/Image";
import { UIButton } from "@/components/UI/Button";
import DruggableFileInput from "@/components/kycVerification/dot/DruggableFileInput";

export const Address = ({ setStep, data, setData }) => {
  const { fetchData, isLoading } = useApi();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handleOnChange = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const { data: result, error: errorRes } = await fetchData(
      "/kyc/verifyAddress",
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

    if (response.address) {
      setData({
        ...data,
        address: {
          ...data.address,
          request: file,
          response: response,
        },
      });

      setStep(Step.VERIFY);
    } else {
      setMessage(
        "Address could not be detected properly. Please use other document"
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
          {"Upload your address document"}
        </h2>
        <h4 className="text-sm font-normal text-slate-600 text-center w-[80%] mt-2">
          {"Accepted documents: Utility bill, Mobile bill, Bank Statement"}
        </h4>

        <div className="my-8">
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
                <DruggableFileInput
                  onChange={handleOnChange}
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
