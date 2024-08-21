import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
      <div className="bg-bg-color2 p-6 rounded-lg max-w-lg w-full relative">
        <button
          className="absolute -top-1 -right-1 m-4 text-red-color text-3xl"
          onClick={onClose}
        >
          <MdClose />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
