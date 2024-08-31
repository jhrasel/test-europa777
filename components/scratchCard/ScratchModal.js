export default function ScratchModal({
  children,
  isOpen,
  onClose,
  btnPosition,
}) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-opacity-100 tab:bg-opacity-50 flex justify-center items-center z-[99999] w-full h-auto">
        <div className=" rounded-xl relative w-full tab:w-auto h-auto">
          <button
            className={`absolute top-4 laptop:top-2 right-4 text-red-color text-4xl z-20 ${btnPosition}`}
            onClick={onClose}
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </>
  );
}
