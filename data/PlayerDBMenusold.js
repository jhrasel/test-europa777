import { useLocale, useTranslations } from "next-intl";
import { BsBank, BsCashCoin } from "react-icons/bs";
import {
  FaGift,
  FaHistory,
  FaStopwatch,
  FaUnlockAlt,
  FaUserCircle,
} from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { HiOutlineIdentification } from "react-icons/hi";
import { IoGameController } from "react-icons/io5";
import { TbCherry } from "react-icons/tb";

export const CashierMenu = () => {
  const t = useTranslations("Menubar");
  const locale = useLocale();

  return [
    {
      id: crypto.randomUUID(),
      icon: <BsCashCoin />,
      name: t("Deposit"),
      url: `/${locale}/player-dashboard/deposit/`,
    },
    {
      id: crypto.randomUUID(),
      icon: <BsBank />,
      name: t("Withdraw"),
      url: `/${locale}/player-dashboard/withdraw/`,
    },
    {
      id: crypto.randomUUID(),
      icon: <IoGameController />,
      name: t("paymentHistory"),
      url: `/${locale}/player-dashboard/payment-history/`,
    },
  ];
};

export const BonusMenu = () => {
  const t = useTranslations("Menubar");
  const locale = useLocale();

  return [
    {
      id: crypto.randomUUID(),
      icon: <BsCashCoin />,
      name: t("promotion"),
      url: `/${locale}/bonus/`,
    },
    {
      id: crypto.randomUUID(),
      icon: <TbCherry />,
      name: t("Free Spins"),
      url: `/${locale}/player-dashboard/free-spin/`,
    },
    {
      id: crypto.randomUUID(),
      icon: <GiReceiveMoney />,
      name: t("vipCashback"),
      url: `/${locale}/vip/`,
    },
    {
      id: crypto.randomUUID(),
      icon: <FaGift />,
      name: t("activeBonus"),
      url: `/${locale}/player-dashboard/active-bonus/`,
    },
    {
      id: crypto.randomUUID(),
      icon: <FaHistory />,
      name: t("bonusHistory"),
      url: `/${locale}/player-dashboard/bonus/`,
    },
  ];
};

export const AccountsMenu = () => {
  const t = useTranslations("Menubar");
  const locale = useLocale();

  return [
    {
      id: crypto.randomUUID(),
      icon: <FaMoneyBillTrendUp />,
      name: t("balance"),
      url: `/${locale}/player-dashboard/`,
    },
    {
      id: crypto.randomUUID(),
      icon: <FaUserCircle />,
      name: t("Profile"),
      url: `/${locale}/player-dashboard/profile/`,
    },
    {
      id: crypto.randomUUID(),
      icon: <HiOutlineIdentification />,
      name: t("Verification"),
      url: `/${locale}/player-dashboard/varification/`,
    },
    {
      id: crypto.randomUUID(),
      icon: <FaStopwatch />,
      name: t("limits"),
      url: `/${locale}/player-dashboard/profile/`,
    },

    {
      id: crypto.randomUUID(),
      icon: <FaUnlockAlt />,
      name: t("password"),
      url: `/${locale}/player-dashboard/profile/`,
    },
  ];
};

export const GameHistory = () => {
  const t = useTranslations("Menubar");
  const locale = useLocale();

  return [
    {
      id: crypto.randomUUID(),
      icon: <IoGameController />,
      name: t("Game History"),
      url: `/${locale}/player-dashboard/game-log/`,
    },
  ];
};
