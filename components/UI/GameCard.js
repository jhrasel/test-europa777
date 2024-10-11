"use client";

import { useFavoriteGames } from "@/context/FavoriteGamesContext";
import { useLoading } from "@/context/LoadingContext";
import useApi from "@/helpers/apiRequest";
import useAuth from "@/helpers/useAuth";
import toast from "react-hot-toast";
import SignIn from "../signIn/SignIn";
import { UIImage } from "./Image";
import { UILink, UILinkBG } from "./Link";
import { H6 } from "./Tags";

export const GameCard = ({
  gameName,
  image,
  demoLink = "",
  liveLink = "",
  liveLinkText = "Play",
  depositLink = "",
  gameId,
  initialIsFavorite,
  onFavoriteChange,
  activeCardId,
  setActiveCardId,
  newGames = false,
}) => {
  const demoLinkCss = "demoLinkCss";

  const { favoriteGames, toggleFavorite } = useFavoriteGames();
  const isFavorite = favoriteGames.includes(gameId);
  const { fetchData } = useApi();
  const { isLoggedIn } = useAuth();
  const { loading } = useLoading();

  const handleFavoriteToggle = async () => {
    try {
      if (isFavorite) {
        await fetchData(`/player/removeFavorite/${gameId}`, "POST");
        toast.success("Game removed from favorites successfully");
      } else {
        await fetchData(`/player/addFavorite/${gameId}`, "POST");
        toast.success("Game added to favorites successfully");
      }
      toggleFavorite(gameId);
      if (onFavoriteChange) {
        onFavoriteChange(gameId, !isFavorite);
      }
    } catch (error) {
      // toast.error("An error occurred, please try again.");
    }
  };

  const handleShowBtn = () => {
    if (!isLoggedIn) {
      toast.error("Please log in to play games"); // Display an alert or toast if not logged in
      return;
    }
    setActiveCardId(gameId === activeCardId ? null : gameId);
  };

  const isActive = activeCardId === gameId;

  return (
    <>
      <div
        onClick={handleShowBtn}
        className="rounded-lg bg-bg-color3 group transition duration-500 ease-out hover:translate-y-[-3px]"
      >
        <div className="rounded-lg relative">
          {/* {loading && <CustomSkeleton hasImage={true} hasText={true} />} */}
          {!loading && (
            <UIImage
              src={image}
              width={200}
              height={200}
              quality={60}
              className="rounded-lg !w-full !h-[175px] tab:!h-[200px] group-hover:blur-sm"
              alt="Game-img"
            />
          )}

          {/* new */}
          {newGames && (
            <div className="absolute top-1 left-1 z-90">
              <H6
                name="New"
                className="bg-red-color !text-white py-1 px-2 !text-xs rounded-sm"
              />
            </div>
          )}

          {/* Desktop button */}
          <div className="rounded-lg absolute top-0 left-0 w-full h-full bg-[#00000080] hidden tab:flex flex-col items-center justify-center px-5 py-2 invisible group-hover:visible">
            {isLoggedIn ? (
              depositLink ? (
                <div className="text-center w-full">
                  <p className="border border-white text-white">
                    {liveLinkText}
                  </p>
                  <UILinkBG
                    href={depositLink}
                    name="Deposit To Play"
                    className="w-full justify-center mt-2 !text-base !px-3"
                    scroll={true}
                  />
                </div>
              ) : (
                <UILinkBG
                  href={liveLink}
                  name={liveLinkText}
                  className="w-full justify-center"
                  scroll={true}
                />
              )
            ) : (
              <SignIn name="Play" className="!bg-blue-color w-full" />
            )}
            {isLoggedIn ? (
              <UILink
                scroll={true}
                href={demoLink}
                name={demoLink ? "Demo" : ""}
                className={
                  demoLink
                    ? `${demoLinkCss} !border-2  !border-blue-color rounded-full justify-center`
                    : ""
                }
              />
            ) : (
              <SignIn
                name={demoLink ? "Demo" : ""}
                className={demoLink ? demoLinkCss : "!hidden"}
              />
            )}
          </div>

          {/* Mobile button */}
          {isActive && (
            <div className="rounded-lg absolute top-0 left-0 w-full h-full bg-[#00000080] flex tab:hidden flex-col items-center justify-center px-5 py-2">
              {isLoggedIn ? (
                depositLink ? (
                  <div className="text-center w-full">
                    <p className="border border-white text-white">
                      {liveLinkText}
                    </p>
                    <UILinkBG
                      href={depositLink}
                      name="Deposit To Play"
                      className="w-full justify-center mt-2 !text-base !px-3"
                      scroll={true}
                    />
                  </div>
                ) : (
                  <UILinkBG
                    href={liveLink}
                    name={liveLinkText}
                    className="w-full justify-center"
                    scroll={true}
                  />
                )
              ) : (
                <SignIn name="Play" className="!bg-blue-color w-full" />
              )}
              {isLoggedIn ? (
                <UILink
                  scroll={true}
                  href={demoLink}
                  name={demoLink ? "Demo" : ""}
                  className={
                    demoLink
                      ? `${demoLinkCss} !border-2  !border-blue-color rounded-full justify-center`
                      : ""
                  }
                />
              ) : (
                <SignIn
                  name={demoLink ? "Demo" : ""}
                  className={demoLink ? demoLinkCss : "!hidden"}
                />
              )}
            </div>
          )}
        </div>

        {/* {isLoggedIn ? (
          <div className="flex items-center justify-between px-3 py-4 gap-2">
            <H6 name={gameName} className="text-white" />
            <div className="cursor-pointer" onClick={handleFavoriteToggle}>
              {isFavorite ? (
                <FaHeart className="text-blue-color text-xl" />
              ) : (
                <FaRegHeart className="text-white text-xl" />
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between px-3 py-4 gap-2 line-clamp-2">
            <H6 name={gameName} className="text-white" />
          </div>
        )} */}
      </div>
    </>
  );
};
