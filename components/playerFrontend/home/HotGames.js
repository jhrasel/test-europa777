"use client";

import { Container, HeaderTitle, UILinkBG } from "@/components/UI";
import { GameCard } from "@/components/UI/GameCard";
import { useFavoriteGames } from "@/context/FavoriteGamesContext";
import { useLoading } from "@/context/LoadingContext";
import useApi from "@/helpers/apiRequest";
import useAuth from "@/helpers/useAuth";
import { useBonusLock } from "@/helpers/useBonusLock";
import { Empty } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { FaFire } from "react-icons/fa";

export const HotGames = ({ getHotGamesData }) => {
  const getData = getHotGamesData.data;

  const { isLoggedIn } = useAuth();
  const { fetchData, isLoading } = useApi();
  const { favoriteGames } = useFavoriteGames();
  const { loading } = useLoading();
  const t = useTranslations("HomePage");
  const com = useTranslations("Common");
  const locale = useLocale();
  const [lockByBonus, setLockByBonus] = useState(null);

  const [activeCardId, setActiveCardId] = useState(null);

  const { renderLink } = useBonusLock();

  // Define handleFavoriteChange
  const handleFavoriteChange = (gameId, isFavorite) => {
    `Game ${gameId} is now ${isFavorite ? "favorited" : "unfavorited"}`;

    fetchGameData();
  };

  return (
    <>
      <div className="pt-5">
        <Container>
          <HeaderTitle icon={<FaFire />} title={t("Hot Games")} href="/slot" />

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
