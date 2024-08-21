import { H5, UILinkBG } from "@/components/UI";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";

const SpinModal = ({ show, onClose, winningNumber }) => {
  const winAudioRef = useRef(null);
  // const loseAudioRef = useRef(null);
  const t = useTranslations("wheelBonus");
  const locale = useLocale();

  // console.log("winningNumber", winningNumber);

  useEffect(() => {
    if (show) {
      if (winningNumber === "No luck") {
        // loseAudioRef.current.play();
      } else {
        winAudioRef.current.play();
      }
    }
  }, [show, winningNumber]);

  if (!show) {
    return null;
  }

  const handleClose = () => {
    window.location.href = `/${locale}/wheel-bonus`;
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999] w-full h-full laptop:pl-64">
      <div className="bg-white p-3 tab:p-5 rounded-xl shadow-lg text-center flex items-center gap-3 w-[90%] tab:w-auto">
        <div className="relative">
          <p className="relative z-[999] w-[350px]">
            {winningNumber === "No luck" ? (
              <div className="">
                <H5 name={t("tryAgain2Hours")} />

                <button
                  onClick={handleClose}
                  className="text-blue-500 text-2xl z-[999] absolute top-0 right-0"
                >
                  <IoMdClose />
                </button>
              </div>
            ) : (
              <div className="">
                {`${t("congratulations")} ${winningNumber}`}
              </div>
            )}
          </p>
          {winningNumber !== "No luck" && (
            <>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full tab:w-[600px] h-full tab:h-[600px] z-0">
                <Image
                  src="/audios/popers.gif"
                  width="1000"
                  height="1000"
                  alt="Congratulations"
                  className="w-full tab:w-[800px] h-full tab:h-[500px] mx-auto mt-4"
                />
              </div>

              <UILinkBG
                name={t("playFreeSpin")}
                href={`/${locale}/free-spin-games`}
                className="uppercase font-medium mt-2 z-[999] relative"
              />

              <button
                onClick={handleClose}
                className="text-blue-500 text-2xl z-[999] absolute top-0 right-2 tab:right-0"
              >
                <IoMdClose />
              </button>
            </>
          )}
        </div>
      </div>
      <audio
        ref={winAudioRef}
        src="/audios/congratulation.mp3"
        preload="auto"
      ></audio>
      {/* <audio
        ref={loseAudioRef}
        src="/audios/no_luck.mp3"
        preload="auto"
      ></audio> */}
    </div>
  );
};

export default SpinModal;
