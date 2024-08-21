import { Button, Modal } from "antd";
import { useState } from "react";
import { SearchTabs } from "./Tabs";

export const GameModal = ({ title, className, icon }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const closeModal = () => {
    // New function to close the modal
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        className={`flex items-center justify-between gap-2 bg-[#13113A] w-full m-auto ${className}`}
        onCancel={handleCancel}
        footer={null}
      >
        {title} {icon}
      </Button>
      <Modal
        open={isModalOpen}
        centered
        onCancel={handleCancel}
        className="!w-[90%] tab:!w-[800px]"
      >
        <div className="p-3 tab:p-5 rounded-lg searchModal max-h-[75vh] laptop:h-auto overflow-y-auto">
          <SearchTabs closeModal={closeModal} />
        </div>
      </Modal>
    </>
  );
};
