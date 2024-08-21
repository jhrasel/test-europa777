"use client";

import { useTranslations } from "next-intl";
import { FaSearch } from "react-icons/fa";
import { GameModal } from "../banner/modal/GameModal";

export const SearchGames = () => {
  const t = useTranslations("Common");
  return (
    <>
      <div className="">
        <GameModal
          title={t("Search")}
          icon={<FaSearch />}
          className="!hidden tab:!flex !flex-row-reverse !shadow-none !bg-[#0D0D0D] text-text-color-primary text-lg gap-3"
        />
      </div>
    </>
  );
};
