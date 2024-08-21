import Slots from "@/svgs/Slots";
import { useLocale, useTranslations } from "next-intl";
import { BsCashCoin } from "react-icons/bs";
import { FaGift, FaHeart } from "react-icons/fa";
import { GiCardAceSpades, GiShipWheel } from "react-icons/gi";
import { HiHome } from "react-icons/hi";
import { LuContact } from "react-icons/lu";
import { RiVipCrown2Fill } from "react-icons/ri";

export const SidebarMenuData = () => {
  const t = useTranslations("Menubar");
  const locale = useLocale();

  return [
    {
      id: crypto.randomUUID(),
      icon: <HiHome />,
      name: t("Lobby"),
      url: `/${locale}/`,
    },
    {
      id: crypto.randomUUID(),
      icon: <Slots />,
      name: t("Slots"),
      url: `/${locale}/slot/`,
    },
    {
      id: crypto.randomUUID(),
      icon: <GiCardAceSpades />,
      name: t("Live Casino"),
      url: "/live-casino",
      url: `/${locale}/live-casino/`,
    },
    {
      id: crypto.randomUUID(),
      icon: <GiShipWheel />,
      name: t("Wheel Bonus"),
      url: `/${locale}/wheel-bonus/`,
    },
    {
      id: crypto.randomUUID(),
      icon: <FaHeart />,
      name: t("My Favorite"),
      url: `/${locale}/my-favorite/`,
    },
    {
      id: crypto.randomUUID(),
      icon: <RiVipCrown2Fill />,
      name: t("VIP"),
      url: "/vip",
      url: `/${locale}/vip/`,
    },
    {
      id: crypto.randomUUID(),
      icon: <FaGift />,
      name: t("Promotions"),
      url: "/bonus",
      url: `/${locale}/bonus/`,
    },
    {
      id: crypto.randomUUID(),
      icon: <BsCashCoin />,
      name: t("Cashback"),
      // url: `/${locale}/player-dashboard/cashback/`,
      url: `/${locale}/cashback/`,
    },
    {
      id: crypto.randomUUID(),
      icon: <LuContact />,
      name: t("Contact"),
      url: `/${locale}/contact/`,
    },
  ];
};
