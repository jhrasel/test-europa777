import useApi from "@/helpers/apiRequest";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import giftBoxAnimation from "../../public/images/giftBox.json";
import { H6, UIImage } from "../UI";
import { ScratchCard } from "./ScratchCard";
import ScratchModal from "./ScratchModal";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function GiftBox() {
  const [showScratchCard, setShowScratchCard] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenMobile, setFullscreenMobile] = useState(false);
  const [scratchCard, setScratchCard] = useState(false);
  const [timer, setTimer] = useState(null);
  const [scratchComplete, setScratchComplete] = useState(false);
  const [canWin, setCanWin] = useState(null);
  const [needKyc, setNeedKyc] = useState(false);
  const { fetchData } = useApi();
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const preventDefault = (e) => {
      if (showScratchCard) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", preventDefault, { passive: false });

    return () => {
      document.removeEventListener("touchmove", preventDefault, {
        passive: false,
      });
    };
  }, [showScratchCard]);

  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      if (showScratchCard && !scratchComplete) {
        event.preventDefault();
        event.returnValue =
          "If you reload the page, your count will be 0. You will have to wait 30 minutes to try again.";
        await sendWinAmountToApi(0);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [showScratchCard, scratchComplete]);

  const handleClick = () => {
    if (needKyc) {
      router.push(`/${locale}/player-dashboard/verification`);
    } else {
      setShowScratchCard(true);
    }
  };

  const handleClose = async () => {
    if (
      window.confirm(
        "If you close the scratch card, your count will be 0. You will have to wait 30 minutes to try again. Do you want to proceed?"
      )
    ) {
      setShowScratchCard(false);
      if (!scratchComplete) {
        await sendWinAmountToApi(0);
      }
      if (fullscreen) {
        toggleFullscreen();
      }
      window.location.reload();
    }
  };

  const toggleFullscreen = () => {
    if (!fullscreen) {
      const docElm = document.documentElement;
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullscreen) {
        docElm.webkitRequestFullscreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setFullscreen(!fullscreen);

    if (!fullscreenMobile) {
      setFullscreenMobile(true);
    }
  };

  const sendWinAmountToApi = async (winAmount) => {
    try {
      const response = await fetchData("/player/scratchBonusClaim", "POST", {
        winAmount,
      });
    } catch (error) {}
  };

  useEffect(() => {
    const fetchWheelData = async () => {
      const { data, error } = await fetchData(
        "/player/getScratchCardBonus",
        "GET"
      );
      if (data) {
        if (data.data.need_kyc) {
          setNeedKyc(true);
          setScratchCard(true);
        } else if (!data.data.is_duplicate_user) {
          setCanWin(data.data.can_win);
          setTimer(
            setTimeout(() => {
              setScratchCard(true);
            }, data.data.remaining_time)
          );
        }
      } else if (error) {
        toast.error(error.message);
      }
    };

    fetchWheelData();

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [fetchData]);

  return (
    <>
      {scratchCard && (
        <>
          <div
            className="cursor-pointer fixed bottom-14 tab:bottom-20 right-0 z-[99] bg-[#50ae3a] text-center px-0.5 pb-1"
            onClick={handleClick}
          >
            <Lottie
              animationData={giftBoxAnimation}
              loop={true}
              className="!w-10 tab:!w-14 !h-10 tab:!h-14"
            />
            <div className="">
              <H6 name="Free" className="!text-white" />
              <H6 name="Gift" className="!text-white" />
            </div>
          </div>
          <ScratchModal isOpen={showScratchCard} onClose={handleClose}>
            <div className="relative h-full hidden tab:block tab:h-auto">
              <UIImage
                src="/images/scratchImg.png"
                alt="scratchImg"
                className="!w-full tab:!w-[330px] !h-full tab:!h-[570px] rounded-xl"
              />
              <div className="absolute tab:bottom-2 left-1/2 -translate-x-1/2">
                {canWin !== null && (
                  <ScratchCard
                    canWin={canWin}
                    setScratchComplete={setScratchComplete}
                  />
                )}
              </div>
            </div>

            <div
              className="relative h-[99vh] tab:hidden tab:h-auto"
              onClick={toggleFullscreen}
            >
              <UIImage
                src="/images/scratchImg.png"
                alt="scratchImg"
                className="!w-full tab:!w-[330px] !h-full tab:!h-[570px] rounded-xl"
              />
              <div className="absolute top-1/2 tab:bottom-2 left-1/2 -translate-x-1/2">
                {canWin !== null && (
                  <ScratchCard
                    canWin={canWin}
                    setScratchComplete={setScratchComplete}
                  />
                )}
              </div>
            </div>
          </ScratchModal>
        </>
      )}
    </>
  );
}
