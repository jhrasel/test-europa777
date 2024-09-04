"use client";

import { Container, HeaderTitle, UILinkBG } from "@/components/UI";
import { GameCard } from "@/components/UI/GameCard";
import { useFavoriteGames } from "@/context/FavoriteGamesContext";
import { useLoading } from "@/context/LoadingContext";
import useApi from "@/helpers/apiRequest";
import useAuth from "@/helpers/useAuth";
import { fetchLockByBonus } from "@/lib/fetchLockByBonus";
import { Empty } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export const TopGames = ({ getTopGamesData }) => {
  // console.log("getTopGamesData", getTopGamesData);

  const getData = getTopGamesData.data;

  const { isLoggedIn } = useAuth();
  const { fetchData, isLoading } = useApi();
  const { favoriteGames } = useFavoriteGames();
  const router = useRouter();
  const { loading } = useLoading();
  const t = useTranslations("HomePage");
  const com = useTranslations("Common");
  const locale = useLocale();
  const [lockByBonus, setLockByBonus] = useState(null);

  const [activeCardId, setActiveCardId] = useState(null);

  // Define handleFavoriteChange
  const handleFavoriteChange = (gameId, isFavorite) => {
    `Game ${gameId} is now ${isFavorite ? "favorited" : "unfavorited"}`;
    fetchGameData();
  };

  useEffect(() => {
    const getLockData = async () => {
      if (isLoggedIn) {
        try {
          const data = await fetchLockByBonus();
          setLockByBonus(data.Player);
        } catch (err) {
          // setError(err.message);
        }
      }
    };

    getLockData();
  }, [isLoggedIn]);

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
      <div className="pt-5">
        <Container>
          <HeaderTitle
            image="/images/home-page/icons/top-games.svg"
            title={t("Top Games")}
            href={`/${locale}/slot`}
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
            <UILinkBG href={`/${locale}/slot`} name={com("Load More")} />
          </div>
        </Container>
      </div>
    </>
  );
};
