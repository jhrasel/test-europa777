"use client";

import {
  H4,
  H6,
  List,
  ListItem,
  P,
  UIImage,
  UIInput,
  UILink,
} from "@/components/UI";
import useApi from "@/helpers/apiRequest";
import { useLocale, useTranslations } from "next-intl";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const SearchGames = ({ closeModal }) => {
  const { fetchData } = useApi();
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const t = useTranslations("HomePage");
  const locale = useLocale();

  useEffect(() => {
    let debounceTimer;

    const fetchGames = async () => {
      const { data, error } = await fetchData(
        `/searchGames?search=${searchTerm}`,
        "GET"
      );

      if (data && data.games && Array.isArray(data.games.data)) {
        setFilteredGames(data.games.data);
        setShowResults(true);
        console.log("search games", data.games.data);
      } else if (error) {
        console.error("Error fetching games:", error);
        setFilteredGames([]);
        setShowResults(false);

        // Display error notification
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      } else {
        console.error("Invalid response data:", data);
        setFilteredGames([]);
        setShowResults(false);
      }
    };

    if (searchTerm.trim() !== "") {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        fetchGames();
      }, 500);
    } else {
      setFilteredGames([]);
      setShowResults(false);
    }

    return () => clearTimeout(debounceTimer);
  }, [fetchData, searchTerm]);

  // Handle changes
  const handleSearchInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
  };

  return (
    <>
      <div className="rounded-xl">
        <UIInput
          placeholder={t("Search Games")}
          value={searchTerm}
          onChange={handleSearchInputChange}
        />

        <div className="mt-2">
          <H4 name={t("Search Games")} className="py-1 !text-black" />

          {showResults && (
            <List className="max-h-[550px] overflow-y-auto mt-2 px-2 pb-2">
              {filteredGames.length === 0 ? (
                <P
                  name={`No games found for "${searchTerm}"`}
                  className="mt-3"
                />
              ) : (
                <List>
                  {filteredGames.map((game) => (
                    <ListItem key={game.id} className="mt-3">
                      <UILink
                        href={`/${locale}/play-game/${game.slug}`}
                        className="w-full hover:bg-[#e5eaf0] rounded-lg"
                        icon={
                          <UIImage
                            src={game.thumbnail || "/images/default-cart.jpg"}
                            className="!h-16 !w-16 rounded-lg object-cover"
                          />
                        }
                        name={
                          <H6
                            name={game.game_name}
                            className="!text-text-color-primary"
                          />
                        }
                        onClick={() => closeModal()}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </List>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchGames;
