import { GameCard, P, UIInput } from "@/components/UI";
import { useLoading } from "@/context/LoadingContext";
import useApi from "@/helpers/apiRequest";
import { useBonusLock } from "@/helpers/useBonusLock"; // Import useBonusLock
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function Favorites() {
  const [searchQuery, setSearchQuery] = useState("");
  const t = useTranslations("HomePage");
  const { fetchData } = useApi();
  const [gameData, setGameData] = useState([]);
  const { loading } = useLoading();
  const locale = useLocale();
  const { renderLink } = useBonusLock(); 

  useEffect(() => {
    const fetchGameData = async () => {
      const { data, error } = await fetchData(
        `/player/getFavoriteGames`,
        "GET"
      );
      if (data) {
        setGameData(data.games.data);
      } else if (error) {
        console.error("Error fetching game data:", error);
      }
    };

    fetchGameData();
  }, [fetchData]);

  // Filter gameData based on searchQuery
  const filteredGameData = gameData.filter((game) =>
    game.game_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Define handleFavoriteChange if needed
  const handleFavoriteChange = (gameId, isFavorite) => {
    console.log(
      `Game ${gameId} is now ${isFavorite ? "favorited" : "unfavorited"}`
    );
    // Update favorite state or make an API call as needed
  };

  return (
    <div className="rounded-xl p-4">
      {/* Search input */}
      <UIInput
        placeholder={t("Search Games")}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-2"
      />

      <div className="mt-2">
        {filteredGameData.length === 0 ? (
          <P
            name={`No games found for "${searchQuery}"`}
            className="mt-3 text-center col-span-6"
          />
        ) : (
          <div className="grid grid-cols-2 tab:grid-cols-3 gap-3">
            {filteredGameData.map((gameData) => {
              const liveLink = renderLink(gameData);
              const isLiveLinkObject = typeof liveLink === "object";

              return (
                <GameCard
                  key={gameData.id}
                  gameId={gameData.id}
                  image={gameData.thumbnail || "/images/default-cart.jpg"}
                  gameName={gameData.game_name}
                  initialIsFavorite={false} // Update this if you have favorite games context
                  onFavoriteChange={handleFavoriteChange}
                  liveLink={!isLiveLinkObject ? liveLink : ""}
                  liveLinkText={isLiveLinkObject ? liveLink.text : "Play"}
                  depositLink={isLiveLinkObject ? liveLink.link : ""}
                  demoLink={
                    gameData.demo === 1
                      ? `/${locale}/demo-game/${gameData.slug}`
                      : ""
                  }
                  activeCardId={null} // Update if needed
                  setActiveCardId={() => {}} // Update if needed
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
