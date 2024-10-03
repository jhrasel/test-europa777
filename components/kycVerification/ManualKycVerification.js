import React, { useState } from "react";
import { Card } from "@/components/UI/Card";
import { UIButton } from "@/components/UI/Button";

export const ManualKycVerification = () => {
  const [modal, setModal] = useState(false);

  const showModal = () => {
    setModal(true);
  };
  const onCancel = () => {
    setModal(false);
  };

  return (
    <>
      <Card className="w-full">
        <div className="flex flex-col items-center my-20">
          <h2 className="text-2xl font-bold text-white mb-12">
            {"Let's get you verified"}
          </h2>
          <UIButton
            name="Start Verification"
            onClick={showModal}
            className="bg-blue-color"
          />
          <p className="text-sm font-thin text-slate-500 mt-4">
            Identity verification will helps companies connect with costomers.
          </p>
        </div>
      </Card>
    </>
  );
};
