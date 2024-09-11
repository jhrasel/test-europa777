import { UIButton } from "@/components/UI/Button";
import { Step } from "./steps";
import { UIImage } from "@/components/UI/Image";

export const Result = ({ setStep, data, onCancel }) => {
  const { success } = data.response;
  const title = success
    ? "Congratulations"
    : "Please use valid credit card on your hand";

  const paragraph = success
    ? "You have successfully verified your credit card, Now you can close the popup"
    : "Sorry, the credit card you used cannot be verified. Please try again with valid credit card on your hand";

  const closeVerification = () => {
    setStep(Step.INSTRUCTION);
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
        {success ? (
          <div className="flex justify-center my-4">
            <UIButton name="Close" onClick={closeVerification} />
          </div>
        ) : (
          <div className="flex justify-center my-4">
            <UIButton
              name="Try again"
              onClick={() => setStep(Step.INSTRUCTION)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
