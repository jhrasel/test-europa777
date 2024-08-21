"use client";

import { GameCard } from "@/components/UI";
import { useFavoriteGames } from "@/context/FavoriteGamesContext";
import { useLoading } from "@/context/LoadingContext";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import useApi from "@/helpers/apiRequest";
import useAuth from "@/helpers/useAuth";
import { Empty } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AfterLoginMyFavorite() {
  const { isLoggedIn } = useAuth();
  const { fetchData, error, isLoading } = useApi();
  const { favoriteGames } = useFavoriteGames();
  const [gameDatas, setGameData] = useState([]);
  const { loading } = useLoading();
  const t = useTranslations("HomePage");
  const com = useTranslations("Common");
  const locale = useLocale();
  const [lockByBonus, setLockByBonus] = useState(null);

  // Define handleFavoriteChange
  const handleFavoriteChange = (gameId, isFavorite) => {
    // Handle favorite change logic if needed
    `Game ${gameId} is now ${isFavorite ? "favorited" : "unfavorited"}`;

    // Refetch the top games data after a change in favorites
    fetchGameData();
  };

  useEffect(() => {
    const fetchGameData = async () => {
      const { data, error } = await fetchData(
        "/player/getFavoriteGames",
        "GET"
      );

      if (data) {
        console.log("getFavoriteGames", data.games.data);
        setGameData(data.games.data);
      } else if (error) {
        toast.error(error.message);
      }
    };
    fetchGameData();
  }, [fetchData, favoriteGames]);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchLockByBonusData = async () => {
        const { data, error } = await fetchData("/player/lockByBonus", "GET");
        if (data) {
          setLockByBonus(data);
        } else if (error) {
          console.error("Error fetching lock by bonus:", error);
        }
      };

      fetchLockByBonusData();
    }
  }, [isLoggedIn, fetchData]);

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
      <div className="grid grid-cols-2 tab:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-6 gap-2 tab:gap-5">
        {isLoading ? ( // Display loading indicator when loading
          Array.from({ length: 6 }).map((_, index) => (
            <CustomSkeleton key={index} hasImage={true} hasText={true} />
          ))
        ) : gameDatas.length === 0 ? (
          <Empty
            description="No data available"
            className="mt-5 text-center col-span-6"
          />
        ) : (
          gameDatas.slice(0, 12).map((gameData) => {
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
          })
        )}
      </div>
    </>
  );
}
