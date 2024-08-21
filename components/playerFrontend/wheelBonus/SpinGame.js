"use client";

import { UILinkBG } from "@/components/UI";
import useApi from "@/helpers/apiRequest";
import { useLocale, useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";

const data = [
  { option: "5 FS" },
  { option: "No Luck" },
  { option: "10 FS" },
  { option: "No Luck" },
  { option: "15 FS" },
  { option: "No Luck" },
  { option: "50 FS" },
  { option: "No Luck" },
  { option: "5 FS" },
  { option: "No Luck" },
  { option: "10 FS" },
  { option: "No Luck" },
  { option: "5 FS" },
  { option: "No Luck" },
];

const DynamicWheel = dynamic(
  () => import("react-custom-roulette").then((mod) => mod.Wheel),
  {
    ssr: false,
  }
);

const SpinGame = ({ winNumber }) => {
  const { fetchData, error, isLoading } = useApi();
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(winNumber);
  const [spinAudio, setSpinAudio] = useState(null);
  const [congratulationAudio, setCongratulationAudio] = useState(null);
  const [noLuckAudio, setNoLuckAudio] = useState(null);
  const [showWinMessage, setShowWinMessage] = useState(false);
  const [showNoLuckMessage, setShowNoLuckMessage] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const locale = useLocale();
  const t = useTranslations("wheelBonus");

  useEffect(() => {
    setSpinAudio(new Audio("/audios/spin_sound.mp3"));
    setCongratulationAudio(new Audio("/audios/congratulation.mp3"));
    setNoLuckAudio(new Audio("/audios/no_luck.mp3"));
  }, []);

  useEffect(() => {
    if (!showWinMessage && congratulationAudio) {
      congratulationAudio.pause();
      congratulationAudio.currentTime = 0;
    }
  }, [showWinMessage, congratulationAudio]);

  const handleSpinClick = async () => {
    setIsSpinning(true);
    setMustSpin(true);
    setShowWinMessage(false);
    setShowNoLuckMessage(false);

    try {
      const response = await fetchData("/player/wheelBonusResult", "POST", {
        winNumber,
      });
      // "response with winNumber", response;
    } catch (error) {}

    // Reset messages

    if (spinAudio) {
      spinAudio.play();
    }
  };

  const handleStopSpinning = () => {
    setIsSpinning(false);
    if (spinAudio) {
      spinAudio.pause();
      spinAudio.currentTime = 0;
    }

    const selectedPrize = data[winNumber]?.option;

    if (selectedPrize === "No Luck") {
      setShowNoLuckMessage(true);
      if (noLuckAudio) {
        noLuckAudio.play();
      }
      if (congratulationAudio) {
        congratulationAudio.pause();
        congratulationAudio.currentTime = 0;
      }
    } else {
      setShowWinMessage(true);
      if (congratulationAudio) {
        congratulationAudio.play();
      }
      if (noLuckAudio) {
        noLuckAudio.pause();
        noLuckAudio.currentTime = 0;
      }
    }
  };

  const handleHideNoLuckMessage = () => {
    setShowNoLuckMessage(false);
    window.location.href = `/${locale}/wheel-bonus`;
  };

  const handleHideLuckMessage = () => {
    setShowWinMessage(false);
    window.location.href = `/${locale}/wheel-bonus`;
  };

  return (
    <>
      <div className="mt-5 flex items-center justify-center overflow-hidden">
        <div className="relative inline-block">
          <DynamicWheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            outerBorderColor={["#f2f2f2"]}
            outerBorderWidth={[10]}
            innerBorderColor={["#f2f2f2"]}
            radiusLineColor={["#dedede"]}
            radiusLineWidth={[1]}
            fontSize={15}
            textColors={["#ffffff"]}
            backgroundColors={[
              "#0055FF",
              "#F22B35",
              "#F99533",
              "#24CA69",
              "#514E50",
              "#46AEFF",
              "#9145B7",
            ]}
            onStopSpinning={() => {
              setMustSpin(false);
              handleStopSpinning();
            }}
          />
          <div
            onClick={handleSpinClick}
            className="cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 "
          >
            <button
              className="text-blue-600 font-bold text-base tab:text-xl w-16 tab:w-28 h-16 tab:h-28 !rounded-full shadow-xl bg-white flex flex-col items-center justify-center"
              disabled={isSpinning}
            >
              {t("spin")}
            </button>
          </div>

          {showWinMessage && (
            <>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-#00000096 flex items-center justify-center w-full h-full">
                <h2 className="text-blue-500 text-lg font-bold bg-gray-300 py-2 px-5 flex items-center gap-3 relative z-30">
                  {t("congratulations")} {data[winNumber].option}
                  <button
                    className="cursor-pointer"
                    onClick={handleHideLuckMessage}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </h2>

                <Image
                  src="/audios/popers.gif"
                  alt="Popup Gif"
                  width="500"
                  height="500"
                  className="w-[500px] h-[500px] absolute"
                />
              </div>

              <UILinkBG
                name={t("playFreeSpin")}
                href={`/${locale}/free-spin-games`}
                className="uppercase font-medium mt-2 relative z-[999]"
              />
            </>
          )}
          {showNoLuckMessage && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-#00000096 flex items-center justify-center w-full h-full">
              <h2 className="text-blue-500 text-lg font-bold bg-gray-300 py-2 px-5 flex items-center gap-3 relative z-30">
                {t("tryAgain2Hours")}
                <button
                  className="cursor-pointer"
                  onClick={handleHideNoLuckMessage}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </h2>

              <Image
                src="/audios/popers.gif"
                alt="Popup Gif"
                width="500"
                height="500"
                className="w-[500px] h-[500px] absolute"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SpinGame;
