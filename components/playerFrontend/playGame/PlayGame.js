"use client";

import { UILink } from "@/components/UI";
import useApi from "@/helpers/apiRequest";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { HiHome } from "react-icons/hi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FadeLoader } from "react-spinners";

export const PlayGame = ({ slagId }) => {
  const { fetchData, error, isLoading } = useApi();
  const [gameData, setGameData] = useState([]);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenMobile, setFullscreenMobile] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    const fetchGameData = async () => {
      const { data, error } = await fetchData(`/player/play/${slagId}`, "POST");
      if (data) {
        setGameData(data.data);
      } else if (error) {
        toast.error(
          error.message || "An error occurred while fetching game data."
        );
      }
    };
    fetchGameData();
  }, [fetchData, slagId]);

  const toggleFullscreen = () => {
    if (!fullscreen) {
      // Request fullscreen
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
      // Exit fullscreen
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

    // Toggle mobile fullscreen state
    if (!fullscreenMobile) {
      setFullscreenMobile(true);
    }
  };

  // Function to handle close button click
  const handleCloseButtonClick = () => {
    window.location.reload();
    // Exit fullscreen mode
    if (fullscreen) {
      toggleFullscreen();
    }
    window.location.href = `/${locale}/`;
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center bg-bg-color1 fixed top-0 left-0 z-[999999999999]">
          <FadeLoader color="#57546e" />
        </div>
      ) : (
        <>
          <div className="fixed top-0 left-0 overflow-auto w-screen z-[999999999999] h-[100vh] bg-[#1B1928]">
            <div className="hidden laptop:flex items-center gap-3 justify-end w-full laptop:bg-[#0D0D0D] p-2 px-5">
              <UILink
                href="/"
                name={<HiHome className="text-3xl" />}
                className="!text-red-color"
              />
              <div className="cursor-pointer" onClick={toggleFullscreen}>
                {fullscreen ? (
                  <AiOutlineFullscreenExit className="text-3xl text-white" />
                ) : (
                  <AiOutlineFullscreen className="text-3xl text-white" />
                )}
              </div>
              <UILink
                href="/"
                name={<IoCloseCircleOutline className="text-3xl" />}
                className="!text-red-color"
                onClick={handleCloseButtonClick}
              />
            </div>

            <div className="absolute top-2 right-2 flex gap-2 items-center laptop:hidden">
              <UILink
                href="/"
                name={<IoCloseCircleOutline className=" text-3xl" />}
                className="!text-red-color"
                onClick={handleCloseButtonClick}
              />
            </div>

            {/* Show the fullscreen element only if fullscreenMobile is false */}
            <div className="laptop:hidden">
              {!fullscreenMobile && (
                <div className="cursor-pointer" onClick={toggleFullscreen}>
                  <AiOutlineFullscreenExit className="text-4xl text-white absolute top-2 left-2 h-screen w-screen opacity-0" />
                </div>
              )}
            </div>

            <iframe
              src={gameData}
              frameBorder="0"
              className="overflow-auto w-screen h-[100vh] laptop:h-[calc(100vh-50px)]"
            ></iframe>
          </div>
        </>
      )}
    </>
  );
};
