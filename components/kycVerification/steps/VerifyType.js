"use client";

import { Step } from "./steps";
import { useState } from "react";
import { Radio, Space } from "antd";
import { UIButton } from "@/components/UI";
import { UIImage } from "@/components/UI/Image";

export const VerifyType = ({ setStep, data, setData }) => {
  const [type, setType] = useState(data.auto);

  const changeVerifyProcess = () => {
    setData({
      ...data,
      auto: type,
    });
    setStep(Step.DOCUMENT_FRONT);
  };

  const onChange = (e) => {
    setType(e.target.value);
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
        <h2 className="text-2xl font-bold text-center">
          {"Change verifying processs"}
        </h2>
        <h4 className="text-sm font-normal text-slate-600 text-center w-[80%] mt-2">
          {"Change verify process to get verified without hesstle"}
        </h4>
        <div className="my-8 flex flex-col items-center">
          <Radio.Group onChange={onChange} value={type}>
            <Space direction="vertical">
              <Radio value={true}>Automatic verification</Radio>
              <Radio value={false}>Manual verification</Radio>
            </Space>
          </Radio.Group>
          <UIButton
            className="mt-4"
            name="Continue"
            onClick={changeVerifyProcess}
          />
        </div>
      </div>
    </div>
  );
};
