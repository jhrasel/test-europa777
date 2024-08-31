"use client";

import { Container, GameCard, HeaderTitle, UILinkBG } from "@/components/UI";
import { useFavoriteGames } from "@/context/FavoriteGamesContext";
import { useLoading } from "@/context/LoadingContext";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import useApi from "@/helpers/apiRequest";
import useAuth from "@/helpers/useAuth";
import { fetchLockByBonus } from "@/lib/fetchLockByBonus";
import { Empty } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export const LiveCasinoHomePage = ({ getLiveCasinoData }) => {
  const getData = getLiveCasinoData.data;

  const { fetchData, isLoading } = useApi();
  const { favoriteGames } = useFavoriteGames();
  // const [gameDatas, setGameDatas] = useState([]);
  const { loading } = useLoading();
  const t = useTranslations("HomePage");
  const com = useTranslations("Common");
  const locale = useLocale();
  const { isLoggedIn } = useAuth();
  const [lockByBonus, setLockByBonus] = useState(null);

  const [activeCardId, setActiveCardId] = useState(null);

  // Define handleFavoriteChange
  const handleFavoriteChange = (gameId, isFavorite) => {
    // Handle favorite change logic if needed
    `Game ${gameId} is now ${isFavorite ? "favorited" : "unfavorited"}`;

    // Refetch the top games data after a change in favorites
    fetchGameData();
  };

  useEffect(() => {
    const getLockData = async () => {
      if (isLoggedIn) {
        try {
          const data = await fetchLockByBonus();
          // console.log("fetchLockByBonus", data);
          setLockByBonus(data);
        } catch (err) {
          // setError(err.message);
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
      <div className="pt-5" data-aos="fade-up">
        <Container>
          <HeaderTitle
            image="/images/home-page/icons/live-casino.svg"
            title={t("Live Casino")}
            href={`/${locale}/live-casino`}
          />

          <div className="grid grid-cols-2 tab:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-6 gap-2 tab:gap-5">
            {getData.length === 0 ? (
              <Empty
                description="No data available"
                className="mt-5 text-center col-span-6"
              />
            ) : (
              getData.slice(0, 12).map((gameData) => {
                const liveLink = renderLink(gameData);
                const isLiveLinkObject = typeof liveLink === "object";

                return (
                  <GameCard
                    key={gameData.id}
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
              })
            )}
          </div>

          <div className="mt-5 text-center">
            <UILinkBG href={`/${locale}/live-casino`} name={com("Load More")} />
          </div>
        </Container>
      </div>
    </>
  );
};

export const LiveCasino = ({ initialGamesData }) => {
  const { fetchData, isLoading } = useApi();
  const { favoriteGames } = useFavoriteGames();
  const [gameDatas, setGameDatas] = useState(initialGamesData.data || []);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const locale = useLocale();
  const { isLoggedIn, logout } = useAuth();
  const pathname = usePathname();
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
