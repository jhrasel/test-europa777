import useAuth from "@/helpers/useAuth";
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

export const PlayerDashboardMenuOld = () => {
  const t = useTranslations("Menubar");
  const tData = useTranslations("tableData");
  const locale = useLocale();
  const { isLoggedIn } = useAuth();

  return [
    {
      id: crypto.randomUUID(),
      icon: <BsCashCoin />,
      name: t("Cashier"),
      url: `/${locale}/player-dashboard/deposit`,
      subMenu: [
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
          name: tData("history"),
          url: `/${locale}/player-dashboard/payment-history/`,
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      icon: <FaGift />,
      name: t("Bonus"),
      url: `/${locale}/player-dashboard/bonus/`,
      subMenu: [
        {
          id: crypto.randomUUID(),
          icon: <BsCashCoin />,
          name: t("Promotions"),
          url: `/${locale}/player-dashboard/promotions/`,
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
          url: `/${locale}/player-dashboard/cashback/`,
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
      ],
    },
    {
      id: crypto.randomUUID(),
      icon: <FaUserCircle />,
      name: t("Profile"),
      url: `/${locale}/player-dashboard/profile/`,
      subMenu: [
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
          url: `/${locale}/player-dashboard/limits/`,
        },

        {
          id: crypto.randomUUID(),
          icon: <FaUnlockAlt />,
          name: t("password"),
          url: `/${locale}/player-dashboard/password/`,
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      icon: <IoGameController />,
      name: t("Game History"),
      url: `/${locale}/player-dashboard/game-log/`,
      subMenu: [
        {
          id: crypto.randomUUID(),
          icon: <IoGameController />,
          name: t("Game History"),
          url: `/${locale}/player-dashboard/game-log/`,
        },
      ],
    },
  ];

  // return [
  //   {
  //     id: crypto.randomUUID(),
  //     icon: <HiHome />,
  //     name: t("Dashboard"),
  //     url: `/${locale}/player-dashboard/`,
  //   },
  //   {
  //     id: crypto.randomUUID(),
  //     icon: <FaUserCircle />,
  //     name: t("Profile"),
  //     url: `/${locale}/player-dashboard/profile/`,
  //   },
  //   {
  //     id: crypto.randomUUID(),
  //     icon: <BsCashCoin />,
  //     name: t("Deposit"),
  //     url: `/${locale}/player-dashboard/deposit/`,
  //   },
  //   {
  //     id: crypto.randomUUID(),
  //     icon: <BsBank />,
  //     name: t("Withdraw"),
  //     url: `/${locale}/player-dashboard/withdraw/`,
  //   },
  //   {
  //     id: crypto.randomUUID(),
  //     icon: <FaGift />,
  //     name: t("Bonus"),
  //     url: `/${locale}/player-dashboard/bonus/`,
  //   },
  //   {
  //     id: crypto.randomUUID(),
  //     icon: <TbCherry />,
  //     name: t("Free Spins"),
  //     url: `/${locale}/player-dashboard/free-spin/`,
  //   },

  //   {
  //     id: crypto.randomUUID(),
  //     icon: <GiReceiveMoney />,
  //     name: t("Cashback"),
  //     url: `/${locale}/player-dashboard/cashback/`,
  //   },
  //   {
  //     id: crypto.randomUUID(),
  //     icon: <HiOutlineIdentification />,
  //     name: t("Verification"),
  //     url: `/${locale}/player-dashboard/varification/`,
  //   },
  //   {
  //     id: crypto.randomUUID(),
  //     icon: <IoGameController />,
  //     name: t("Game History"),
  //     url: `/${locale}/player-dashboard/game-log/`,
  //   },
  // ];
};
