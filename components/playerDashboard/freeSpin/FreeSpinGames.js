"use client";

import { Container, GameCard, H2 } from "@/components/UI";
import { useFavoriteGames } from "@/context/FavoriteGamesContext";
import { useLoading } from "@/context/LoadingContext";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import useApi from "@/helpers/apiRequest";
import useAuth from "@/helpers/useAuth";
import { Empty } from "antd";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const FreeSpinGames = () => {
  // ;
  const { isLoggedIn } = useAuth();
  const { fetchData, error, isLoading } = useApi();
  const { favoriteGames } = useFavoriteGames();
  const [gameDatas, setGameDatas] = useState([]);
  const router = useRouter();
  const { loading } = useLoading();
  const locale = useLocale();

  const [activeCardId, setActiveCardId] = useState(null);

  const [freeSpin, setFreeSpin] = useState("0");

  const handleFavoriteChange = (gameId, isFavorite) => {
    `Game ${gameId} is now ${isFavorite ? "favorited" : "unfavorited"}`;

    fetchGameData();
  };

  const [lockByBonus, setLockByBonus] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchLockByBonusData = async () => {
        try {
          const { data, error } = await fetchData(
            "/player/getFreeSpinGames",
            "GET"
          );

          if (data) {
            setLockByBonus(data.games);
          } else if (error) {
            console.error("API Request Error:", error);
            toast.error(
              error.message ||
                "An error occurred while fetching free spin games."
            );
          }
        } catch (err) {
          console.error("Unexpected Error:", err);
          toast.error("An unexpected error occurred. Please try again.");
        }
      };

      fetchLockByBonusData();
    }
  }, [isLoggedIn, fetchData]);

  const renderLink = (gameData) => {
    const isNoDepositBonus = lockByBonus?.promotion_type === "noDepositBonus";
    const isSameApiProvider =
      lockByBonus?.provider_name === gameData.api_provider;

    // Assuming you might have different logic for different conditions, modify accordingly.
    return `/${locale}/play-game/${gameData.slug}`;
  };

  const fetchUserData = async () => {
    try {
      const { data, error } = await fetchData(
        "/player/getFreeSpinsHistory",
        "GET"
      );

      if (data) {
        setFreeSpin(data.freeSpinRemaining);
      } else if (error) {
        console.error("API Request Error:", error);
        toast.error(
          error.message ||
            "An error occurred while fetching free spins history."
        );
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [fetchData]);

  return (
    <>
      <div className="pt-5">
        <Container>
          <H2
            name={`${freeSpin} Free Spins - Games`}
            className="py-5 bg-bg-color2 text-center"
          />

          <div className="grid grid-cols-2 tab:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-6 gap-5 mt-7">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <CustomSkeleton key={index} hasImage={true} hasText={true} />
              ))
            ) : lockByBonus?.length == 0 ? (
              <Empty
                description="No data available"
                className="mt-5 text-center col-span-6"
              />
            ) : (
              lockByBonus?.map((gameData) => {
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
        </Container>
      </div>
    </>
  );
};
