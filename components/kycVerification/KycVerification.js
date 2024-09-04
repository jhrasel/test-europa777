import React, { useState } from "react";
import { Modal } from "antd";
import { Card } from "@/components/UI/Card";
import { UIButton } from "@/components/UI/Button";
import { KycContainer } from "./KycContainer";

export const KycVerification = () => {
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
      <Modal
        open={modal}
        centered
        onCancel={onCancel}
        className="!w-[90%] tab:!w-[700px]"
        footer={null}
      >
        <div className="py-4 tab:py-8 px-4 tab:px-16">
          <KycContainer onCancel={onCancel} />
        </div>
      </Modal>
    </>
  );
};
