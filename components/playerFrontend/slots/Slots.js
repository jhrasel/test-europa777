"use client";

import { Container, GameCard } from "@/components/UI";
import { useFavoriteGames } from "@/context/FavoriteGamesContext";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import useApi from "@/helpers/apiRequest";
import useAuth from "@/helpers/useAuth";
import { fetchLockByBonus } from "@/lib/fetchLockByBonus";
import { Empty } from "antd";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export const Slots = ({ initialGamesData }) => {
  const { fetchData, isLoading } = useApi();
  const { favoriteGames } = useFavoriteGames();
  const [gameDatas, setGameDatas] = useState(initialGamesData.data || []);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const locale = useLocale();
  const { isLoggedIn, logout } = useAuth();
  const pathname = usePathname();

  console.log("pathname", pathname);

  const [lockByBonus, setLockByBonus] = useState(null);
  const [activeCardId, setActiveCardId] = useState(null);

  const lastGameElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const handleFavoriteChange = (gameId, isFavorite) => {
    console.log(
      `Game ${gameId} is now ${isFavorite ? "favorited" : "unfavorited"}`
    );
    try {
      fetchGameData(page);
    } catch (error) {
      console.error("Error updating favorite status:", error);
      toast.error(
        "An error occurred while updating favorite status. Please try again."
      );
    }
  };

  const fetchGameData = async (currentPage) => {
    const newGames = initialGamesData.games.data;
    setGameDatas((prevGames) => [...prevGames, ...newGames]);
    setHasMore(initialGamesData.games.next_page_url !== null);
  };

  useEffect(() => {
    fetchGameData(page);
  }, [fetchData, page]);

  useEffect(() => {
    const getLockData = async () => {
      if (isLoggedIn) {
        try {
          const data = await fetchLockByBonus();
          setLockByBonus(data);
        } catch (err) {
          console.error("Error fetching lock by bonus data:", err.message);
        }
      }
    };

    getLockData();
  }, [isLoggedIn]);

  const renderLink = (gameData) => {
    const haveDepositBonus =
      lockByBonus?.data?.promotion_type === "noDepositBonus" &&
      gameData?.no_dep_bonus === 1;
    const noDepositBonus =
      lockByBonus?.data?.promotion_type === "noDepositBonus" &&
      gameData?.no_dep_bonus === 0;

    if (haveDepositBonus) {
      return `/${locale}/play-game/${gameData.slug}`;
    } else if (noDepositBonus) {
      return {
        link: `/${locale}/player-dashboard/deposit`,
        text: "LOCK IN BONUS",
      };
    } else {
      return `/${locale}/play-game/${gameData.slug}`;
    }
  };

  return (
    <>
      <section className="mt-5">
        <Container>
          <div className="grid grid-cols-2 tab:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-6 gap-2 tab:gap-5 ">
            {gameDatas.map((gameData, index) => {
              const liveLink = renderLink(gameData);
              const isLiveLinkObject = typeof liveLink === "object";
              const uniqueKey = `${gameData.id}-${index}`; // Composite key

              if (gameDatas.length === index + 1) {
                return (
                  <div ref={lastGameElementRef} key={uniqueKey}>
                    <GameCard
                      key={uniqueKey}
                      gameId={gameData.id}
                      image={gameData.thumbnail || "/images/default-cart.jpg"}
                      gameName={gameData.game_name}
                      initialIsFavorite={favoriteGames.includes(gameData.id)}
                      onFavoriteChange={handleFavoriteChange}
                      liveLink={!isLiveLinkObject ? liveLink : ""}
                      liveLinkText={isLiveLinkObject ? liveLink.text : "Play"}
                      depositLink={isLiveLinkObject ? liveLink.link : ""}
                      demoLink={
                        gameData.demo === 1
                          ? `/${locale}/demo-game/${gameData.slug}`
                          : ""
                      }
                      activeCardId={activeCardId}
                      setActiveCardId={setActiveCardId}
                    />
                  </div>
                );
              } else {
                return (
                  <GameCard
                    key={uniqueKey}
                    gameId={gameData.id}
                    image={gameData.thumbnail || "/images/default-cart.jpg"}
                    gameName={gameData.game_name}
                    initialIsFavorite={favoriteGames.includes(gameData.id)}
                    onFavoriteChange={handleFavoriteChange}
                    liveLink={!isLiveLinkObject ? liveLink : ""}
                    liveLinkText={isLiveLinkObject ? liveLink.text : "Play"}
                    depositLink={isLiveLinkObject ? liveLink.link : ""}
                    demoLink={
                      gameData.demo === 1
                        ? `/${locale}/demo-game/${gameData.slug}`
                        : ""
                    }
                    activeCardId={activeCardId}
                    setActiveCardId={setActiveCardId}
                  />
                );
              }
            })}

            {isLoading &&
              Array.from({ length: 6 }).map((_, index) => (
                <CustomSkeleton key={index} hasImage={true} hasText={true} />
              ))}
            {!isLoading && gameDatas.length === 0 && (
              <Empty
                description="No data available"
                className="mt-5 text-center col-span-6"
              />
            )}
          </div>
        </Container>
      </section>
    </>
  );
};
