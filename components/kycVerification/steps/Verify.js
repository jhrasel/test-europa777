"use client";

import { Step } from "./steps";
import { UIImage } from "@/components/UI/Image";
import { VerifyingSteps } from "./VerifyingSteps";
import useApi from "@/helpers/apiRequest";
import { useEffect } from "react";
import { UIButton } from "@/components/UI/Button";

export const Verify = ({ setStep, data, setData }) => {
  const { fetchData, isLoading } = useApi();

  const appendFormData = (formData, data, parentKey = "") => {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const fullKey = parentKey ? `${parentKey}[${key}]` : key;
        const value = data[key];
        if (
          value &&
          typeof value === "object" &&
          !(value instanceof File) &&
          !(value instanceof Blob)
        ) {
          // Recursively call if the value is an object and not a File
          appendFormData(formData, value, fullKey);
        } else {
          // Append the file or value to FormData
          formData.append(fullKey, value);
        }
      }
    }
  };

  const verifyKyc = async () => {
    const formData = new FormData();
    appendFormData(formData, data);

    const { data: result, error: errorRes } = await fetchData(
      "/kyc/verifyKyc",
      "POST",
      formData,
      null,
      { "Content-Type": "multipart/form-data" }
    );
    if (errorRes || !result?.data) {
      setMessage("Something went wrong, please try again.");
      setError(true);
    }

    const response = result?.data;

    if (response) {
      setData({
        ...data,
        response: response,
      });
    }
    setStep(Step.RESULT);
  };

  useEffect(() => {
    verifyKyc();
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
        <h2 className="text-2xl font-bold text-center">{"Please wait..."}</h2>
        <h4 className="text-sm font-normal text-slate-600 text-center w-[80%] mt-2">
          {"We are processing and verifying your provided documents and selfie"}
        </h4>
        <div className="my-8">
          <VerifyingSteps />
        </div>
        <div className="flex justify-center my-4">
          <UIButton name="Try again" onClick={verifyKyc} />
        </div>
      </div>
    </div>
  );
};
