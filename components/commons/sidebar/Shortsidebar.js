import { H3, List, ListItem, UIImage, UILink, UILinkBG } from "@/components/UI";
import SignUp from "@/components/signUp/SignUp";
import { SidebarMenuData } from "@/data/SidebarMenu";
import useAuth from "@/helpers/useAuth";
import useBalance from "@/hook/useBalance";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { BsCashCoin } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleRLine } from "react-icons/ri";

export const Shortsidebar = ({ closeMobileSidebar }) => {
  const router = usePathname();
  const { isLoggedIn, logout } = useAuth();
  const locale = useLocale();
  const menubar = useTranslations("Menubar");
  const balance = useBalance();

  const menuData = SidebarMenuData();

  const handleMenuItemClick = () => {
    closeMobileSidebar();
  };

  return (
    <>
      <div className="mob:hidden laptop:block pt-24 px-0 transition-all ease-in-out duration-500 h-screen pb-10 w-[80px] bg-bg-color1 z-70 py-6 shadow-md fixed top-0 left-0 overflow-y-auto">
        {/* after login */}
        {isLoggedIn && (
          <>
            <div className="flex flex-col items-center justify-center mb-1">
              {/* <H3 name="Balance" className="!text-base" /> */}
              <div className="flex items-center justify-center gap-1">
                <H3 name={balance?.balance} className="!text-base" />
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-2">
              <UILinkBG
                href={`/${locale}/player-dashboard/deposit`}
                icon={<BsCashCoin />}
                className="justify-center line-clamp-1 !text-sm"
                onClick={handleMenuItemClick}
              />
              <UILink
                onClick={handleMenuItemClick}
                href={`/${locale}/player-dashboard/profile`}
                icon={<CgProfile />}
                className="!text-sm border border-blue-color py-1 laptop:py-1.5 px-4 tab:px-5 laptop:px-8 rounded-full justify-center hover:bg-blue-color hover:text-white line-clamp-1"
              />
            </div>
            {/* <VipLevelForShortSidebar /> */}
          </>
        )}

        {/* header */}
        <div className={"flex flex-wrap gap-2"}>
          <UILink
            href={`/${locale}/wheel-bonus`}
            className={
              "w-full flex-col justify-between py-0.5 px-2 rounded-md !bg-gradient-to-r from-[#161421] to-[#005aff] !font-bold !leading-[18px] !text-xs !gap-0.5"
            }
            icon={
              <UIImage
                src="/images/sidebar-btn/side-wheel.png"
                alt="side-wheel"
                className="!h-8 !w-8 rounded-full animate-spin-slow"
              />
            }
            // name={menubar("Wheel Bonus")}
          />
          <UILink
            href={`/${locale}/cashback/`}
            className={
              "w-full flex-col justify-between py-0.5 px-2 rounded-md !bg-gradient-to-r from-[#161421] to-[#cc00bb] !font-bold !leading-[18px] !text-xs !gap-0.5"
            }
            icon={
              <UIImage
                src="/images/sidebar-btn/cashback.svg"
                alt="cashback"
                className="!h-8"
              />
            }
            // name={menubar("DailyCashback")}
          />
          <UILink
            href={`/${locale}/vip`}
            className={
              "w-full flex-col justify-between py-0.5 px-2 rounded-md !bg-gradient-to-r from-[#161421] to-[#cc0000] !font-bold !leading-[18px] !gap-0.5"
            }
            icon={
              <UIImage
                src="/images/sidebar-btn/vip.svg"
                alt="vip"
                className="!h-8"
              />
            }
            // name={menubar("VIP")}
          />
          <UILink
            href={`/${locale}/bonus`}
            className={
              "w-full flex-col justify-between py-0.5 px-2 rounded-md !bg-gradient-to-r from-[#161421] to-[#70c600] !font-bold !leading-[18px] !gap-0.5"
            }
            icon={
              <UIImage
                src="/images/sidebar-btn/bonus.svg"
                alt="bonus"
                className="!h-8"
              />
            }
            // name={menubar("Bonus")}
          />
        </div>

        {/* Menubar */}
        <List className="mt-4 px-2">
          {menuData?.map((data) => (
            <ListItem key={data.id} className="">
              {data.showSignUp ? (
                <div className="flex items-center w-full px-5 py-2 rounded-lg gap-3 !text-white relative">
                  {data.icon}
                  {/* overlay */}
                  <div className="absolute top-0 left-0 h-full w-full opacity-0">
                    <SignUp />
                  </div>
                </div>
              ) : (
                <UILink
                  href={data.url}
                  icon={data.icon}
                  name={null}
                  target={data.external ? "_blank" : ""}
                  scroll={true}
                  className={`w-full px-5 py-2 rounded-lg justify-center !text-xl ${
                    router === data.url ? "bg-bg-color2" : "!text-white"
                  }`}
                />
              )}
            </ListItem>
          ))}
        </List>

        {/* after login */}
        {isLoggedIn && (
          <div
            className="px-5 pt-10 w-full flex items-center justify-center gap-2 text-text-color-primary text-xl cursor-pointer"
            onClick={logout}
          >
            <RiLogoutCircleRLine />
          </div>
        )}
      </div>
    </>
  );
};
