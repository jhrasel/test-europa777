import { H3, List, ListItem, UIImage, UILink, UILinkBG } from "@/components/UI";
import LocalSwitcher from "@/components/local-switcher";
import { SidebarMenuData } from "@/data/SidebarMenu";
import useAuth from "@/helpers/useAuth";
import useBalance from "@/hook/useBalance";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { BsCashCoin } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { AmountDropdown } from "../navbar/AmountDropdown";
import VipLevel from "./VipLevel";

export const Mobilesidebar = ({ closeMobileSidebar }) => {
  const router = usePathname();
  const { isLoggedIn, logout } = useAuth();

  const menuData = SidebarMenuData();
  const balance = useBalance();

  const t = useTranslations("Common");
  const menubar = useTranslations("Menubar");

  const locale = useLocale();

  const handleMenuItemClick = () => {
    closeMobileSidebar();
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full laptop:hidden pt-20 px-2 transition-all ease-in-out duration-500 h-screen bg-bg-color1 z-[999] py-6 shadow-md overflow-y-auto">
        {/* after login */}
        {isLoggedIn && (
          <>
            {/* <div className="flex flex-col items-center justify-center mb-1">
              <H3 name="Balance" className="!text-xl" />
              <div className="flex items-center justify-center gap-1">
                <H3 name={balance?.currency} className="!text-xl" />
                <H3 name={balance?.balance} className="!text-xl" />
              </div>
            </div> */}

            <div className="flex flex-col items-center justify-center mb-1">
              <H3 name="Balance" className="!text-xl" />
              <div className="flex items-center justify-center gap-1">
                <H3
                  name={balance?.currency}
                  className="!text-base !font-medium"
                />
                <AmountDropdown className="!border-0 !text-white !font-bold !px-1" />
              </div>
            </div>

            <div className="flex flex-col gap-2 my-2">
              <UILinkBG
                href={`/${locale}/player-dashboard/deposit`}
                icon={<BsCashCoin />}
                name={menubar("Deposit")}
                className="justify-center line-clamp-1 !text-lg w-56 m-auto "
                onClick={handleMenuItemClick}
              />
              <UILink
                onClick={handleMenuItemClick}
                href={`/${locale}/player-dashboard/profile`}
                icon={<CgProfile />}
                name={menubar("Account")}
                className="!text-lg border border-blue-color py-1 laptop:py-1.5 rounded-full justify-center hover:bg-blue-color hover:text-white line-clamp-1 w-56 m-auto"
              />
            </div>

            <VipLevel />
          </>
        )}

        {/* header */}
        <div className={"flex flex-wrap gap-2"}>
          <UILink
            href={`/${locale}/wheel-bonus`}
            className={
              "w-[48%] flex-row-reverse justify-between py-0 px-2 rounded-md !bg-gradient-to-r from-[#161421] to-[#005aff] !font-bold !leading-[18px] !text-[13px] !gap-1"
            }
            icon={
              <UIImage
                src="/images/sidebar-btn/side-wheel.png"
                className="!h-12 !w-12 rounded-full animate-spin-slow"
              />
            }
            name={menubar("Wheel Bonus")}
            onClick={handleMenuItemClick}
          />
          <UILink
            href={`/${locale}/cashback/`}
            className={
              "w-[48%] flex-row-reverse justify-between py-0 px-2 rounded-md !bg-gradient-to-r from-[#161421] to-[#cc00bb] !font-bold !leading-[18px] !text-[13px] !gap-1"
            }
            icon={
              <UIImage
                src="/images/sidebar-btn/cashback.svg"
                className="!h-12"
              />
            }
            name={menubar("DailyCashback")}
            onClick={handleMenuItemClick}
          />
          <UILink
            href={`/${locale}/vip`}
            className={
              "w-[48%] flex-row-reverse justify-between py-0 px-2 rounded-md !bg-gradient-to-r from-[#161421] to-[#cc0000] !font-bold !leading-[18px] !gap-1"
            }
            icon={
              <UIImage src="/images/sidebar-btn/vip.svg" className="!h-12" />
            }
            name={menubar("VIP")}
            onClick={handleMenuItemClick}
          />
          <UILink
            href={`/${locale}/bonus`}
            className={
              "w-[48%] flex-row-reverse justify-between py-0 px-2 rounded-md !bg-gradient-to-r from-[#161421] to-[#70c600] !font-bold !leading-[18px] !gap-1"
            }
            icon={
              <UIImage src="/images/sidebar-btn/bonus.svg" className="!h-12" />
            }
            name={menubar("Bonus")}
            onClick={handleMenuItemClick}
          />
        </div>

        {/* Menubar */}
        <List className="mt-5 px-2 overflow-y-auto ">
          {menuData?.map((data) => (
            <ListItem key={data.id} className="">
              <UILink
                href={data.url}
                icon={data.icon}
                name={data.name}
                scroll={true}
                className={`w-full px-5 py-2 rounded-lg justify-start ${
                  router === data.url ? "bg-bg-color2" : "!text-white"
                }`}
                onClick={handleMenuItemClick}
              />
            </ListItem>
          ))}
        </List>

        {/* Language */}
        <div className="pl-5 pt-2">
          {/* <LanguageDropdown /> */}
          <LocalSwitcher />
        </div>

        {/* after login */}
        {isLoggedIn && (
          <div
            className="pl-9 mt-10 flex items-center gap-2 text-text-color-primary text-lg cursor-pointer"
            onClick={logout}
          >
            <RiLogoutCircleRLine /> {t("Log out")}
          </div>
        )}
      </div>
    </>
  );
};
