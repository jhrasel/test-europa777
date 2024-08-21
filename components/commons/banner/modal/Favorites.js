import { List, ListItem, P, UIImage, UIInput, UILink } from "@/components/UI";
import { useLoading } from "@/context/LoadingContext";
import useApi from "@/helpers/apiRequest";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function Favorites() {
  const [searchQuery, setSearchQuery] = useState("");
  const t = useTranslations("HomePage");
  const { fetchData } = useApi();
  const [gameData, setGameData] = useState([]);
  const { loading } = useLoading();
  const locale = useLocale();

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

  return (
    <div className="rounded-xl">
      {/* Search input */}
      <UIInput
        placeholder={t("Search Games")}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="mt-2">
        <List className="max-h-[500px] overflow-y-auto px-2 pb-2 flex w-full items-center gap-2 flex-wrap mt-2">
          {filteredGameData.length === 0 ? (
            <P
              name={`No provider found for "${searchQuery}"`}
              className="mt-3"
            />
          ) : (
            filteredGameData.map((game) => (
              <ListItem key={game.id} className="w-[48%] tab:w-[32%]">
                <UILink
                  href={`/${locale}/play-game/${game.slug}`}
                  className="w-full bg-bg-color3 p-5 hover:bg-bg-color2 rounded-lg !flex-col pb-2 capitalize"
                  icon={
                    <UIImage
                      src={game.thumbnail || "/images/default-cart.jpg"}
                      className="!h-14 !w-full rounded-lg object-contain mb-2"
                    />
                  }
                  name={
                    <P
                      name={game.game_name}
                      className="!text-white pr-1 !text-md"
                    />
                  }
                />
              </ListItem>
            ))
          )}
        </List>
      </div>
    </div>
  );
}
