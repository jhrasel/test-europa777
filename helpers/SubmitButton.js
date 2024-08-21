"use client";
import { UIButton } from "@/components/UI";
import { ClockLoader } from "react-spinners";

const SubmitButton = ({ isLoading, name, className }) => {
  return (
    <div className="mt-4 flex items-center justify-between">
      {isLoading ? (
        <UIButton
          type="submit"
          icon={
            <ClockLoader
              className="text-heading-0"
              color="#FFF"
              size={30}
              margin={0}
            />
          }
          disabled
          className={`w-full !bg-blue-color ${className}`}
          // {...props}
        />
      ) : (
        <UIButton
          htmlType="submit"
          name={name}
          className={`w-full !bg-blue-color ${className}`}
          // {...props}
        />
      )}
    </div>
  );
};

export default SubmitButton;
