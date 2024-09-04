"use client";

import { Modal } from "antd";
import { CardContainer } from "./CardContainer";

export const CreditCardVerification = ({ modal, onCancel }) => {
  return (
    <>
      <Modal
        open={modal}
        centered
        onCancel={onCancel}
        className="!w-[90%] tab:!w-[700px]"
        footer={null}
      >
        <div className="py-4 tab:py-8 px-4 tab:px-16">
          {modal && <CardContainer onCancel={onCancel} />}
        </div>
      </Modal>
    </>
  );
};
