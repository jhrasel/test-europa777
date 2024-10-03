import { H3, List, ListItem, UIImage, UILink, UILinkBG } from "@/components/UI";
import SignIn from "@/components/signIn/SignIn";
import SignUp from "@/components/signUp/SignUp";
import { SidebarMenuData } from "@/data/SidebarMenu";
import useAuth from "@/helpers/useAuth";
import useBalance from "@/hook/useBalance";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { BsCashCoin } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { AmountDropdown } from "../navbar/AmountDropdown";
import { AfterLogin } from "./AfterLogin";
import VipLevel from "./VipLevel";

export const Longsidebar = () => {
  const router = usePathname();
  const { isLoggedIn, logout } = useAuth();
  const menuData = SidebarMenuData();
  const balance = useBalance();
  const t = useTranslations("Common");
  const menubar = useTranslations("Menubar");
  const locale = useLocale();

  return (
    <>
      <div className="mob:hidden laptop:block pt-24 px-2 transition-all ease-in-out duration-500 h-screen w-full laptop:w-[280px] bg-bg-color1 z-[99] py-6 shadow-md fixed top-0 left-0 flex flex-col justify-between overflow-y-auto">
        <div className="">
          {/* after login */}

          {isLoggedIn ? (
            <>
              <AfterLogin />

              <div className="flex flex-col items-center justify-center mb-1">
                <H3 name="Balance" className="!text-xl" />
                <div className="flex items-center justify-center gap-1">
                  <H3
                    name={balance?.currency}
                    className="!text-lg !font-medium"
                  />
                  <AmountDropdown className="!border-0 !text-white !text-xl !font-bold !px-1" />
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-1">
                <UILinkBG
                  href={`/${locale}/player-dashboard/deposit`}
                  icon={<BsCashCoin />}
                  name={menubar("Deposit")}
                  className="justify-center line-clamp-1 !text-sm"
                />
                <UILink
                  href={`/${locale}/player-dashboard/profile`}
                  icon={<CgProfile />}
                  name={menubar("Account")}
                  className="!text-sm border border-blue-color py-1 laptop:py-1.5 px-4 tab:px-5 laptop:px-8 rounded-full justify-center hover:bg-blue-color hover:text-white line-clamp-1"
                />
              </div>
              <VipLevel />
            </>
          ) : (
            <>
              <div className="flex flex-col gap-2 mb-3 px-10">
                <SignUp />
                {/* <SignUpModal /> */}
                <SignIn name={t("Sign In")} />
                {/* <SignInModal /> */}
              </div>
            </>
          )}

          {/* header */}
          <div className={"flex flex-wrap gap-2"}>
            <UILink
              href={`/${locale}/wheel-bonus`}
              className={
                "w-[48%] flex-row-reverse justify-between py-0.5 px-3 rounded-md !bg-gradient-to-r from-[#161421] to-[#005aff] !font-bold !leading-[18px] !text-[13px] !gap-1"
              }
              icon={
                <UIImage
                  src="/images/sidebar-btn/side-wheel.png"
                  alt="side-wheel"
                  className="!h-10 !w-10 !rounded-full animate-spin-slow object-contain"
                />
              }
              name={menubar("Wheel Bonus")}
            />
            <UILink
              href={`/${locale}/cashback/`}
              className={
                "w-[48%] flex-row-reverse justify-between py-0.5 px-3 rounded-md !bg-gradient-to-r from-[#161421] to-[#cc00bb] !font-bold !leading-[18px] !text-[13px] !gap-1"
              }
              icon={
                <UIImage
                  src="/images/sidebar-btn/cashback.svg"
                  alt="cashback"
                  className="!h-10"
                />
              }
              name={menubar("DailyCashback")}
            />
            <UILink
              href={`/${locale}/vip`}
              className={
                "w-[48%] flex-row-reverse justify-between py-0.5 px-3 rounded-md !bg-gradient-to-r from-[#161421] to-[#cc0000] !font-bold !leading-[18px] !gap-1"
              }
              icon={
                <UIImage
                  src="/images/sidebar-btn/vip.svg"
                  alt="vip"
                  className="!h-10"
                />
              }
              name={menubar("VIP")}
            />
            <UILink
              href={`/${locale}/bonus`}
              className={
                "w-[48%] flex-row-reverse justify-between py-0.5 px-3 rounded-md !bg-gradient-to-r from-[#161421] to-[#70c600] !font-bold !leading-[18px] !gap-1"
              }
              icon={
                <UIImage
                  src="/images/sidebar-btn/bonus.svg"
                  alt="bonus"
                  className="!h-10"
                />
              }
              name={menubar("Bonus")}
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
                  target={data.external ? "_blank" : ""}
                  className={`w-full px-5 py-2 rounded-lg justify-start ${
                    router === data.url ? "bg-bg-color2" : "!text-white"
                  }`}
                />
              </ListItem>
            ))}
          </List>
        </div>

        {/* after login */}
        {isLoggedIn && (
          <div
            className="pl-7 pt-10 flex items-center gap-2 text-text-color-primary text-lg cursor-pointer"
            onClick={logout}
          >
            <RiLogoutCircleRLine /> {t("Log out")}
          </div>
        )}
      </div>
    </>
  );
};
