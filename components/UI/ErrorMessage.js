import React from "react";

export const ErrorMessage = ({ errorName, className }) => {
  return (
    <>
      <div className={`text-xs text-red-600 font-normal mt-1 ${className}`}>
        {errorName}
      </div>
    </>
  );
};
