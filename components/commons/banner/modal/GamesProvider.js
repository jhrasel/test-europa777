"use client";

import { List, ListItem, P, UIInput, UILink } from "@/components/UI";
import { useLoading } from "@/context/LoadingContext";
import useApi from "@/helpers/apiRequest";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

export const GamesProvider = ({ closeModal }) => {
  const { fetchData } = useApi();
  const [gameData, setGameData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { loading } = useLoading();
  const t = useTranslations("HomePage");
  const locale = useLocale();

  useEffect(() => {
    const fetchGameData = async () => {
      const { data, error } = await fetchData(
        `/searchGameProvider?search=${searchQuery}`,
        "GET"
      );
      if (data) {
        setGameData(data.data);
      } else if (error) {
      }
    };

    fetchGameData();
  }, [fetchData, searchQuery]);

  // Filter gameData based on searchQuery
  const filteredGameData = gameData.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
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
          {/* Render filtered gameData */}
          {filteredGameData.length === 0 ? (
            <P
              name={`No provider found for "${searchQuery}"`}
              className="mt-3"
            />
          ) : (
            filteredGameData.map((game) => (
              <ListItem key={game.id} className="w-[48%] tab:w-[32%]">
                <UILink
                  href={`/${locale}/provider-games/${game.name}`}
                  className="w-full bg-bg-color3 p-5 hover:bg-bg-color2 rounded-lg !flex-col pb-2 capitalize"
                  icon={
                    <Image
                      width={300}
                      height={300}
                      src={game.logo || "/images/default-cart.jpg"}
                      className="w-full h-14 rounded-lg object-contain mb-2"
                      alt={game.name}
                      quality={60}
                    />
                  }
                  name={
                    <P name={game.name} className="!text-white pr-1 !text-md" />
                  }
                  onClick={() => closeModal()}
                />
              </ListItem>
            ))
          )}
        </List>
      </div>
    </div>
  );
};
