"use client";

import { P, UIInput } from "@/components/UI";
import { GameCard } from "@/components/UI/GameCard";
import useApi from "@/helpers/apiRequest";
import useAuth from "@/helpers/useAuth";
import { useBonusLock } from "@/helpers/useBonusLock";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const SearchGames = ({ closeModal }) => {
  const { fetchData } = useApi();
  const { isLoggedIn } = useAuth();
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [lockByBonus, setLockByBonus] = useState(null);
  const [activeCardId, setActiveCardId] = useState(null);
  const t = useTranslations("HomePage");
  const locale = useLocale();

  const { renderLink } = useBonusLock();

  // Fetch games data
  useEffect(() => {
    let debounceTimer;

    const fetchGames = async (query = "") => {
      const apiEndpoint = query
        ? `/searchGames?search=${query}`
        : `/searchGames`;
      const { data, error } = await fetchData(apiEndpoint, "GET");

      if (data && data.games && Array.isArray(data.games.data)) {
        setFilteredGames(data.games.data);
        setShowResults(true);
      } else if (error) {
        console.error("Error fetching games:", error);
        setFilteredGames([]);
        setShowResults(false);
        toast.error(
          error.message || "An unexpected error occurred. Please try again."
        );
      } else {
        console.error("Invalid response data:", data);
        setFilteredGames([]);
        setShowResults(false);
      }
    };

    if (searchTerm.trim() !== "") {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        fetchGames(searchTerm);
      }, 500);
    } else {
      fetchGames();
    }

    return () => clearTimeout(debounceTimer);
  }, [fetchData, searchTerm]);

  // Define handleFavoriteChange
  const handleFavoriteChange = (gameId, isFavorite) => {
    console.log(
      `Game ${gameId} is now ${isFavorite ? "favorited" : "unfavorited"}`
    );
    // Update favorite state or make an API call as needed
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="rounded-xl p-4">
      <UIInput
        placeholder={t("Search Games")}
        value={searchTerm}
        onChange={handleSearchInputChange}
        className="mb-2"
      />

      {/* <H4 name={t("Search Games")} className="py-1 !text-black" /> */}

      <div className="mt-2">
        {showResults ? (
          <div className="grid grid-cols-2 tab:grid-cols-3 gap-3">
            {filteredGames.length === 0 ? (
              <P
                name={`No games found for "${searchTerm}"`}
                className="mt-3 text-center col-span-6"
              />
            ) : (
              filteredGames.map((gameData) => {
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
                    activeCardId={activeCardId}
                    setActiveCardId={setActiveCardId}
                  />
                );
              })
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchGames;
