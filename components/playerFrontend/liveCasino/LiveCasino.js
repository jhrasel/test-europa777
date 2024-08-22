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
import { useCallback, useEffect, useRef, useState } from "react";
import { FadeLoader } from "react-spinners";

export const LiveCasinoHomePage = ({ gethHomePageGames }) => {
  const getData = gethHomePageGames.data.liveGames;

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
          setError(err.message);
        }
      }
    };

    getLockData();
  }, [isLoggedIn]);

  if (isLoading)
    return (
      <Container>
        <div className="mt-2 m-auto text-center flex items-center justify-center">
          <FadeLoader color="#FFF" />
        </div>
      </Container>
    );

  const renderLink = (gameData) => {
    const isNoDepositBonus = lockByBonus?.promotion_type === "noDepositBonus";
    const isAkaPovProvider = gameData?.api_provider === "Akapov";
    const isEvolutionProvider = gameData?.provider != "Evolution";
    const isSameApiProvider =
      lockByBonus?.provider_name === gameData.api_provider;

    if (
      isNoDepositBonus &&
      isAkaPovProvider &&
      isEvolutionProvider &&
      isSameApiProvider
    ) {
      return `/${locale}/play-game/${gameData.slug}`;
    } else if (
      isNoDepositBonus &&
      !isAkaPovProvider &&
      (!isEvolutionProvider || !isSameApiProvider)
    ) {
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

export const LiveCasino = () => {
  const { fetchData, isLoading } = useApi();
  const { favoriteGames } = useFavoriteGames();
  const [gameDatas, setGameDatas] = useState([]);
  const { loading } = useLoading();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const locale = useLocale();
  const { isLoggedIn, logout } = useAuth();
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

  //  handleFavoriteChange
  const handleFavoriteChange = (gameId, isFavorite) => {
    `Game ${gameId} is now ${isFavorite ? "favorited" : "unfavorited"}`;

    fetchGameData();
  };

  useEffect(() => {
    const fetchGameData = async () => {
      const { data, error } = await fetchData(
        `/getGamesByType/live-casino?page=${page}`,
        "GET"
      );
      if (data) {
        const newGames = data.games.data;
        setGameDatas((prevGames) => [...prevGames, ...newGames]);
        setHasMore(data.games.next_page_url !== null);
      } else if (error) {
        console.error("Error fetching game data:", error);
      }
    };
    fetchGameData();
  }, [fetchData, page]);

  useEffect(() => {
    const getLockData = async () => {
      if (isLoggedIn) {
        try {
          const data = await fetchLockByBonus();
          // console.log("fetchLockByBonus", data);
          setLockByBonus(data);
        } catch (err) {
          setError(err.message);
        }
      }
    };

    getLockData();
  }, [isLoggedIn]);

  if (isLoading)
    return (
      <Container>
        <div className="mt-2 m-auto text-center flex items-center justify-center">
          <FadeLoader color="#FFF" />
        </div>
      </Container>
    );

  const renderLink = (gameData) => {
    const isNoDepositBonus = lockByBonus?.promotion_type === "noDepositBonus";
    const isAkaPovProvider = gameData?.api_provider === "Akapov";
    const isEvolutionProvider = gameData?.provider != "Evolution";
    const isSameApiProvider =
      lockByBonus?.provider_name === gameData.api_provider;

    if (
      isNoDepositBonus &&
      isAkaPovProvider &&
      isEvolutionProvider &&
      isSameApiProvider
    ) {
      return `/${locale}/play-game/${gameData.slug}`;
    } else if (
      isNoDepositBonus &&
      !isAkaPovProvider &&
      (!isEvolutionProvider || !isSameApiProvider)
    ) {
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
              if (gameDatas.length === index + 1) {
                return (
                  <div ref={lastGameElementRef} key={gameData.id}>
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
                  </div>
                );
              } else {
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
