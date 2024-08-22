"use client";

import { UIImage, UILink } from "@/components/UI";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import useAuth from "@/helpers/useAuth";
import useBalance from "@/hook/useBalance";
import { Dropdown } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { BsBank, BsCashCoin } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaGift, FaUserCircle } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { HiHome, HiOutlineIdentification } from "react-icons/hi";
import { IoGameController } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { TbCherry } from "react-icons/tb";
import { AmountDropdown } from "./AmountDropdown";

export function AfterLogin() {
  const balance = useBalance();
  const { isLoggedIn, logout } = useAuth();
  const t = useTranslations("Menubar");
  const com = useTranslations("Common");
  const locale = useLocale();

  const router = usePathname();

  if (balance === null) {
    return <CustomSkeleton hasImage={false} hasText={true} />;
  }

  const isPlayGameRoute = router.includes(`/${locale}/play-game`);

  const items = [
    {
      key: "1",
      label: (
        <div className="flex items-center gap-2 text-lg text-text-color-primary">
          <UILink
            href={`/${locale}/player-dashboard/profile`}
            icon={<CgProfile />}
            name={t("Profile")}
            className="!text-text-color-primary !bg-none"
          />
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex items-center gap-2 text-lg text-text-color-primary">
          <UILink
            href={`/${locale}/player-dashboard`}
            icon={<HiHome />}
            name={t("My account")}
            className="!text-text-color-primary !bg-none"
          />
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className="flex items-center gap-2 text-lg text-text-color-primary">
          <UILink
            href={`/${locale}/player-dashboard/deposit`}
            icon={<BsCashCoin />}
            name={t("Deposit")}
            className="!text-text-color-primary !bg-none"
          />
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div className="flex items-center gap-2 text-lg text-text-color-primary">
          <UILink
            href={`/${locale}/player-dashboard/withdraw`}
            icon={<BsBank />}
            name={t("Withdraw")}
            className="!text-text-color-primary !bg-none"
          />
        </div>
      ),
    },

    {
      key: "5",
      label: (
        <div className="flex items-center gap-2 text-lg text-text-color-primary">
          <UILink
            href={`/${locale}/player-dashboard/bonus`}
            icon={<FaGift />}
            name={t("Bonus")}
            className="!text-text-color-primary !bg-none"
          />
        </div>
      ),
    },
    {
      key: "6",
      label: (
        <div className="flex items-center gap-2 text-lg text-text-color-primary">
          <UILink
            href={`/${locale}/player-dashboard/free-spin`}
            icon={<TbCherry />}
            name={t("Free Spins")}
            className="!text-text-color-primary !bg-none"
          />
        </div>
      ),
    },
    {
      key: "7",
      label: (
        <div className="flex items-center gap-2 text-lg text-text-color-primary">
          <UILink
            href={`/${locale}/player-dashboard/cashback`}
            icon={<GiReceiveMoney />}
            name={t("Cashback")}
            className="!text-text-color-primary !bg-none"
          />
        </div>
      ),
    },

    {
      key: "8",
      label: (
        <div className="flex items-center gap-2 text-lg text-text-color-primary">
          <UILink
            href={`/${locale}/player-dashboard/varification`}
            icon={<HiOutlineIdentification />}
            name={t("Verification")}
            className="!text-text-color-primary !bg-none"
          />
        </div>
      ),
    },

    {
      key: "9",
      label: (
        <div className="flex items-center gap-2 text-lg text-text-color-primary">
          <UILink
            href={`/${locale}/player-dashboard/game-log`}
            icon={<IoGameController />}
            name={t("Game History")}
            className="!text-text-color-primary !bg-none"
          />
        </div>
      ),
    },

    {
      key: "10",
      label: (
        <div className="flex items-center gap-2 text-lg text-text-color-primary">
          <div
            className=" flex items-center gap-2 text-lg cursor-pointer"
            onClick={logout}
          >
            <RiLogoutCircleRLine /> {com("Log out")}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex items-center gap-2 laptop:gap-4 relative z-[99999]">
      {/* coin */}

      {!isPlayGameRoute && <AmountDropdown />}

      <UILink
        icon={
          <UIImage
            src="/images/deposit.svg"
            alt="deposit"
            className="!h-8 !w-auto"
          />
        }
        href={`/${locale}/player-dashboard/deposit`}
      />

      <Dropdown
        menu={{
          items,
        }}
        placement="bottomRight"
        arrow
        className="relative z-[99999]"
      >
        <FaUserCircle className="text-3xl tab:text-4xl text-white cursor-pointer" />
      </Dropdown>
    </div>
  );
}
