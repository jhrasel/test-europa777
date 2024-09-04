"use client";

"use client";

import { Container, GameCard } from "@/components/UI";
import { useFavoriteGames } from "@/context/FavoriteGamesContext";
import useAuth from "@/helpers/useAuth";
import { fetchLockByBonus } from "@/lib/fetchLockByBonus";
import { fetchSlotsGames } from "@/lib/fetchSlotsAPI";
import { Empty } from "antd";
import { throttle } from "lodash";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";

export const Slots = ({ initialGamesData }) => {
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

  const handleFavoriteChange = (gameId, isFavorite) => {
    console.log(
      `Game ${gameId} is now ${isFavorite ? "favorited" : "unfavorited"}`
    );
  };

  useEffect(() => {
    const getLockData = async () => {
      if (isLoggedIn) {
        try {
          const data = await fetchLockByBonus();
          setLockByBonus(data.Player);
        } catch (err) {
          console.error(err);
        }
      }
    };

    getLockData();
  }, [isLoggedIn]);

  const loadGamesByPage = async (page) => {
    setIsLoading(true);
    try {
      const newGamesData = await fetchSlotsGames(page);
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

  const renderLink = (gameData) => {
    const haveDepositBonus =
      lockByBonus?.promotion_type === "noDepositBonus" &&
      gameData?.no_dep_bonus === 1;
    const noDepositBonus =
      lockByBonus?.promotion_type === "noDepositBonus" &&
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
