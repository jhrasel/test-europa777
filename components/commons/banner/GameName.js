import { UILink } from "@/components/UI";
import { useLocale, useTranslations } from "next-intl";
import { CiSearch } from "react-icons/ci";
import { FaHeart, FaHome, FaStar } from "react-icons/fa";
import { GiCardAceSpades, GiShipWheel } from "react-icons/gi";
import { MdOutlineCasino } from "react-icons/md";
import { TbCherry } from "react-icons/tb";
import { GameModal } from "./modal/GameModal";

const GameName = () => {
  const t = useTranslations("Menubar");
  const com = useTranslations("Common");
  const locale = useLocale();

  return (
    <>
      <div className="px-2 laptop:px-3 py-2 laptop:py-3 flex-nowrap block tab:flex items-center justify-between gap-3 bg-[#2B294E] rounded-lg mt-2 w-full">
        {/* left */}
        <div className="flex items-center justify-between w-full pr-5 pb-2 laptop:pb-0 overflow-x-auto mob:gap-2">
          {/* item */}
          <div className="flex items-center gap-2 group">
            <UILink
              href={`/${locale}/`}
              icon={<FaHome />}
              name={t("Lobby")}
              className="!text-base desktop:!text-xl hover:!text-blue-color"
            />
          </div>
          {/* item */}
          <div className="flex items-center gap-2 group">
            <UILink
              href={`/${locale}/slot`}
              icon={<MdOutlineCasino />}
              name={t("Slots")}
              className="!text-base desktop:!text-xl hover:!text-blue-color"
            />
          </div>
          {/* item */}
          <div className="flex items-center gap-2 group">
            <UILink
              href={`/${locale}/`}
              icon={<FaStar />}
              name={t("Top")}
              className="!text-base desktop:!text-xl hover:!text-blue-color"
            />
          </div>
          {/* item */}
          <div className="flex items-center gap-2 group">
            <UILink
              href={`/${locale}/live-casino`}
              icon={<GiCardAceSpades />}
              name={t("Live")}
              className="!text-base desktop:!text-xl hover:!text-blue-color"
            />
          </div>
          {/* item */}
          <div className="flex items-center gap-2 group">
            <UILink
              href={`/${locale}/`}
              icon={<TbCherry />}
              name={t("Hot")}
              className="!text-base desktop:!text-xl hover:!text-blue-color"
            />
          </div>
          {/* item */}
          <div className="flex items-center gap-2 group">
            <UILink
              href={`/${locale}/my-favorite`}
              icon={<FaHeart />}
              name={t("Favorite")}
              className="!text-base desktop:!text-xl hover:!text-blue-color"
            />
          </div>
          {/* item */}
          <div className="flex items-center gap-2 group">
            <UILink
              href={`/${locale}/wheel-bonus`}
              icon={<GiShipWheel />}
              name={t("Wheel")}
              className="!text-base desktop:!text-xl hover:!text-blue-color"
            />
          </div>
        </div>
        {/* right */}
        <div className="mob:w-full tab:w-[550px] mob:mt-2 tab:mt-0">
          <GameModal title={com("Search for games")} icon={<CiSearch />} />
        </div>
      </div>
    </>
  );
};

export default GameName;
