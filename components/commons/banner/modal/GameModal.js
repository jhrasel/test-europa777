import SignIn from "@/components/signIn/SignIn";
import useAuth from "@/helpers/useAuth";
import { Button, Modal } from "antd";
import { useState } from "react";
import { SearchTabs } from "./Tabs";

export const GameModal = ({ title, className, icon }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn } = useAuth();
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
      {isLoggedIn ? (
        <Button
          type="primary"
          onClick={showModal}
          className={`flex items-center justify-between gap-2 bg-[#13113A] w-full m-auto ${className}`}
          onCancel={handleCancel}
          footer={null}
        >
          {title} {icon}
        </Button>
      ) : (
        <div
          type="primary"
          className={`flex items-center justify-between gap-2 tab:bg-[#13113A] text-white w-full m-auto relative rounded-md py-1 px-2`}
          footer={null}
        >
          <span className="hidden tab:inline-block">{title}</span> {icon}
          <SignIn
            name=""
            className="w-full opacity-0 rounded absolute top-0 left-0 h-full"
          />
        </div>
      )}
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
