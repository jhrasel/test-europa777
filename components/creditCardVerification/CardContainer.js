"use client";

import React, { useState } from "react";
import { Step } from "./steps/steps";
import { Instruction } from "./steps/Instruction";
import { CreditCardFront } from "./steps/CreditCardFront";
import { CreditCardBack } from "./steps/CreditCardBack";
import { Result } from "./steps/Result";
import { cardDataFormat } from "./cardDataFormat";

export const CardContainer = ({ onCancel }) => {
  const [step, setStep] = useState(Step.INSTRUCTION);
  const [data, setData] = useState(cardDataFormat);

  const renderStep = (currentStep) => {
    switch (currentStep) {
      case Step.INSTRUCTION:
        return <Instruction setStep={setStep} />;
      case Step.CREDITCARD_FRONT:
        return (
          <CreditCardFront setStep={setStep} data={data} setData={setData} />
        );
      case Step.CREDITCARD_BACK:
        return (
          <CreditCardBack setStep={setStep} data={data} setData={setData} />
        );
      case Step.RESULT:
        return <Result setStep={setStep} data={data} onCancel={onCancel} />;
      default:
        return <Instruction setStep={setStep} />;
    }
  };

  return <div>{renderStep(step)}</div>;
};
