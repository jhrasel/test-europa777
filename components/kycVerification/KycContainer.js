"use client";

import React, { useEffect, useState } from "react";
import { Step } from "./steps/steps";
import { Introduction } from "./steps/Introduction";
import { Instruction } from "./steps/Instruction";
import { DocumentFront } from "./steps/DocumentFront";
import { DocumentBack } from "./steps/DocumentBack";
import { Selfie } from "./steps/Selfie";
import { Address } from "./steps/Address";
import { Verify } from "./steps/Verify";
import { Result } from "./steps/Result";
import { kycDataFormat } from "./KycDataFormat";

export const KycContainer = ({ onCancel }) => {
  const [step, setStep] = useState(Step.INTRODUCTION);
  const [data, setData] = useState(kycDataFormat);

  const renderStep = (currentStep) => {
    switch (currentStep) {
      case Step.INTRODUCTION:
        return <Introduction setStep={setStep} />;
      case Step.INSTRUCTION:
        return <Instruction setStep={setStep} />;
      case Step.DOCUMENT_FRONT:
        return (
          <DocumentFront setStep={setStep} data={data} setData={setData} />
        );
      case Step.DOCUMENT_BACK:
        return <DocumentBack setStep={setStep} data={data} setData={setData} />;
      case Step.SELFIE:
        return <Selfie setStep={setStep} data={data} setData={setData} />;
      case Step.ADDRESS:
        return <Address setStep={setStep} data={data} setData={setData} />;
      case Step.VERIFY:
        return <Verify setStep={setStep} data={data} setData={setData} />;
      case Step.RESULT:
        return <Result setStep={setStep} data={data} onCancel={onCancel} />;
      default:
        return <Introduction setStep={setStep} data={data} setData={setData} />;
    }
  };

  return <div>{renderStep(step)}</div>;
};
