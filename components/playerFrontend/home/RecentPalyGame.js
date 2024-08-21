"use client";

import { Container, HeaderTitle } from "@/components/UI";
import { GameCard } from "@/components/UI/GameCard";
import { useFavoriteGames } from "@/context/FavoriteGamesContext";
import { useLoading } from "@/context/LoadingContext";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import useApi from "@/helpers/apiRequest";
import useAuth from "@/helpers/useAuth";
import { fetchLockByBonus } from "@/lib/fetchLockByBonus";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";

export const RecentPalyGame = () => {
  const { fetchData } = useApi();
  const { favoriteGames } = useFavoriteGames();
  const [gameDatas, setGameDatas] = useState([]);
  const { loading } = useLoading();
  const { isLoggedIn, logout } = useAuth();
  const locale = useLocale();
  const [lockByBonus, setLockByBonus] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Define handleFavoriteChange
  const handleFavoriteChange = (gameId, isFavorite) => {
    // Handle favorite change logic if needed
    `Game ${gameId} is now ${isFavorite ? "favorited" : "unfavorited"}`;

    // Refsetch the top games data after a change in favorites
    fetchGameData();
  };

  useEffect(() => {
    const fetchGameData = async () => {
      const { data, error } = await fetchData(
        "/player/getRecentGameHistory",
        "GET"
      );
      if (data) {
        // console.log("getRecentGameHistory", data.data);
        setGameDatas(data.data.data);
      } else if (error) {
        console.error("Error fetching top games:", error);
      }
    };
    fetchGameData();
  }, [fetchData, favoriteGames]);

  useEffect(() => {
    const getLockData = async () => {
      if (isLoggedIn) {
        setIsLoading(true);
        try {
          const data = await fetchLockByBonus();
          // console.log("fetchLockByBonus", data);
          setLockByBonus(data);
        } catch (err) {
          setError(err.message || "Failed to fetch lock data");
        } finally {
          setIsLoading(false);
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
  if (error)
    return (
      <Container>
        <div className="mt-2 m-auto ">Error: {error}</div>
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
