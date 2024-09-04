import { Step } from "./steps";
import { UIImage } from "@/components/UI/Image";
import { UIButton } from "@/components/UI/Button";
import { CardIcon } from "../icons/CardIcon";

export const Instruction = ({ setStep }) => {
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
          {"Confirm your credit card"}
        </h2>
        <h4 className="text-md font-semibold text-slate-600 text-center w-[80%] mt-2">
          {
            "We'll ask for your Credit Card. It's quick and secure, and trusted by millions of users."
          }
        </h4>
        <span className="my-4">
          <CardIcon />
        </span>
      </div>

      <p className="mb-4 text-center">
        We uses automation to verify your credit card.
      </p>

      <div className="flex justify-center">
        <UIButton
          name="Let's go"
          onClick={() => setStep(Step.CREDITCARD_FRONT)}
        />
      </div>
    </div>
  );
};
