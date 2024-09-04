"use client";

import { Step } from "./steps";
import { UIImage } from "@/components/UI/Image";
import { BiPersonVcardFill } from "../icons/BiPersonVcardFill";
import { BiFiletypePdf } from "../icons/BiFiletypePdf";
import { UIButton } from "@/components/UI/Button";

export const Introduction = ({ setStep }) => {
  return (
    <div className="flex flex-col text-slate-700">
      <div className="bg-bg-color1 py-2 rounded-tr-lg">
        <UIImage
          src="/images/logo.png"
          alt="logo"
          className="!w-auto h-6 laptop:h-8 m-auto"
        />
      </div>
      <h2 className="text-2xl font-bold text-center my-8">
        {"Let's get you verified"}
      </h2>
      <div className="flex flex-col bg-slate-100 rounded">
        <div className="flex gap-x-4 m-4">
          <BiPersonVcardFill />
          <div className="flex flex-col">
            <h4 className="text-md font-semibold">Prepare a valid document</h4>
            <ul className="list-disc ml-4">
              <li className="text-sm font-normal text-slate-600">
                {"Accepted documents: Driver's license, passport, ID card."}
              </li>
              <li className="text-sm font-normal text-slate-600">
                {"Make sure it's not expired or physically damaged"}
              </li>
            </ul>
          </div>
        </div>
        <div className="flex gap-x-4 m-4">
          <BiFiletypePdf />
          <div className="flex flex-col">
            <h4 className="text-md font-semibold">
              Prepare a valid Address document
            </h4>
            <ul className="list-disc ml-4">
              <li className="text-sm font-normal text-slate-600">
                {
                  "Accepted documents: Utility bill, Mobile bill, Bank Statement"
                }
              </li>
              <li className="text-sm font-normal text-slate-600">
                {"Make sure the file in PDF format"}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className="my-8 text-center">
        You can use smartphone phone or any smart device to take selfie and scan
        your document
      </p>

      <div className="flex justify-center">
        <UIButton name="Continue" onClick={() => setStep(Step.INSTRUCTION)} />
      </div>
    </div>
  );
};
