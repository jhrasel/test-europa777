"use client";

import { Container, HeaderTitle } from "@/components/UI";
import { GameCard } from "@/components/UI/GameCard";
import { useFavoriteGames } from "@/context/FavoriteGamesContext";
import { useLoading } from "@/context/LoadingContext";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import useApi from "@/helpers/apiRequest";
import useAuth from "@/helpers/useAuth";
import { fetchRecentGameHistory } from "@/lib/fetchHomeAPI";
import { fetchLockByBonus } from "@/lib/fetchLockByBonus";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

export const RecentPalyGame = () => {
  const { fetchData, isLoading } = useApi();
  const { favoriteGames } = useFavoriteGames();
  const [gameDatas, setGameDatas] = useState([]);
  const { loading } = useLoading();
  const { isLoggedIn } = useAuth();
  const locale = useLocale();
  const [lockByBonus, setLockByBonus] = useState(null);

  const [activeCardId, setActiveCardId] = useState(null);

  // Define handleFavoriteChange
  const handleFavoriteChange = (gameId, isFavorite) => {
    // Handle favorite change logic if needed
    `Game ${gameId} is now ${isFavorite ? "favorited" : "unfavorited"}`;

    // Refsetch the top games data after a change in favorites
    fetchGameData();
  };

  useEffect(() => {
    const getLockData = async () => {
      if (isLoggedIn) {
        try {
          const getRecentHistory = await fetchRecentGameHistory();
          setGameDatas(getRecentHistory.data.data);
          const data = await fetchLockByBonus();
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
      {isLoggedIn && gameDatas.length > 0 && (
        <div className="pt-5">
          <Container>
            <HeaderTitle
              image="/images/home-page/icons/recent.png"
              title="RECENTLY PLAYED"
            />

            <div className="grid grid-cols-2 tab:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-6 gap-2 tab:gap-5">
              {isLoading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <CustomSkeleton
                      key={index}
                      hasImage={true}
                      hasText={true}
                    />
                  ))
                : gameDatas.slice(0, 12).map((gameData) => {
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
                  })}
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

