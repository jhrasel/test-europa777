"use client";

import { Container, GameCard, HeaderTitle, UILinkBG } from "@/components/UI";
import { useFavoriteGames } from "@/context/FavoriteGamesContext";
import { useLoading } from "@/context/LoadingContext";
import useApi from "@/helpers/apiRequest";
import useAuth from "@/helpers/useAuth";
import { Empty } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";

import { throttle } from "lodash";

import { useBonusLock } from "@/helpers/useBonusLock";
import { fetchLiveCasinoGames } from "@/lib/fetchLiveCasinoAPI";
import { CgCardHearts } from "react-icons/cg";

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

  const { renderLink } = useBonusLock();

  // Define handleFavoriteChange
  const handleFavoriteChange = (gameId, isFavorite) => {
    // Handle favorite change logic if needed
    `Game ${gameId} is now ${isFavorite ? "favorited" : "unfavorited"}`;

    // Refetch the top games data after a change in favorites
    fetchGameData();
  };

  return (
    <>
      <div className="pt-5" data-aos="fade-up">
        <Container>
          <HeaderTitle
            icon={<CgCardHearts />}
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
  const [gamesData, setGamesData] = useState(initialGamesData.games.data);
  const [currentPage, setCurrentPage] = useState(
    initialGamesData.games.current_page
  );
  const [totalPages, setTotalPages] = useState(
    initialGamesData.games.last_page
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { isLoggedIn } = useAuth();
  const { favoriteGames } = useFavoriteGames();
  const locale = useLocale();
  const [lockByBonus, setLockByBonus] = useState(null);
  const [activeCardId, setActiveCardId] = useState(null);

  const { renderLink } = useBonusLock();

  const handleFavoriteChange = (gameId, isFavorite) => {
    console.log(
      `Game ${gameId} is now ${isFavorite ? "favorited" : "unfavorited"}`
    );
  };

  const loadGamesByPage = async (page) => {
    setIsLoading(true);
    try {
      const newGamesData = await fetchLiveCasinoGames(page);
      setGamesData((prevData) => [...prevData, ...newGamesData.games.data]);
      setCurrentPage(newGamesData.games.current_page);
      setTotalPages(newGamesData.games.last_page);
      setHasMore(
        newGamesData.games.current_page < newGamesData.games.last_page
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1500
      ) {
        if (hasMore && !isLoading) {
          loadGamesByPage(currentPage + 1);
        }
      }
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage, hasMore, isLoading]);

  return (
    <>
      <section className="mt-5">
        <Container>
          <div className="grid grid-cols-2 tab:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-6 gap-2 tab:gap-5">
            {gamesData.length > 0 ? (
              gamesData.map((gameData) => {
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
            ) : (
              <Empty
                description="No data available"
                className="mt-5 text-center col-span-6"
              />
            )}
          </div>
          {isLoading && (
            <div className="text-center my-5 flex items-center justify-center gap-2">
              <FadeLoader color="#FFF" />
            </div>
          )}
        </Container>
      </section>
    </>
  );
};
