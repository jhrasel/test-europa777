"use client";

import { UIImage, UILink } from "@/components/UI";
import LocalSwitcher from "@/components/local-switcher";
import { DuplicateAccountModal } from "@/components/signIn/DuplicateAccountModal";
import { default as SignIn } from "@/components/signIn/SignIn";
import SignInModal from "@/components/signIn/SignInModal";
import SignUp from "@/components/signUp/SignUp";
import SignUpModal from "@/components/signUp/SignUpModal";
import useAuth from "@/helpers/useAuth";
import { useLocale, useTranslations } from "next-intl";
import { FaArrowLeft, FaBars } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { AfterLogin } from "./AfterLogin";
import { SearchGames } from "./Search";

const Navbar = ({ showSidebar, handleSidebarToggle, showSidebarMobile }) => {
  const { isLoggedIn } = useAuth();
  const t = useTranslations("Menubar");
  const com = useTranslations("Common");
  const locale = useLocale();
  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[9999] bg-[#0D0D0D] py-3 tab:py-4 px-2 tab:px-5">
        <div className="flex items-center justify-between">
          {/* left */}
          <div className="flex items-center gap-2 tab:gap-4 laptop:gap-8">
            {/* sidebarIcon */}
            <div
              className="cursor-pointer w-[30px] laptop:w-[50px] h-[30px] laptop:h-[50px] tab:rounded-full tab:border-2 border-white flex items-center justify-center"
              onClick={handleSidebarToggle}
            >
              {showSidebar ? (
                <GiHamburgerMenu className="hidden laptop:block text-xl laptop:text-2xl text-white" />
              ) : (
                <>
                  <FaArrowLeft className="hidden laptop:block text-xl laptop:text-2xl text-white" />
                  <GiHamburgerMenu className="hidden text-xl laptop:text-2xl text-white" />
                </>
              )}

              {showSidebarMobile ? (
                <FaBars className="laptop:hidden text-2xl text-white" />
              ) : (
                <MdClose className=" laptop:hidden text-2xl  text-white" />
              )}
            </div>

            <div className="flex items-center gap-3 tab:gap-5">
              {/* logo */}
              <div className="-mb-2">
                <UILink
                  href={`/${locale}/`}
                  name={
                    <UIImage
                      src="/images/logo.png"
                      alt="logo"
                      className="w-auto !h-[30px] laptop:!h-10"
                    />
                  }
                />
              </div>

              <div className="mob:hidden laptop:flex items-center gap-5">
                <UILink
                  href={`/${locale}/slot`}
                  name={t("GAMES")}
                  className="text-xl font-bold hover:text-blue-color"
                />
                <UILink
                  href={`/${locale}/vip`}
                  name={t("VIP")}
                  className="text-xl font-bold hover:text-blue-color"
                />
                <UILink
                  href={`/${locale}/bonus`}
                  name={t("Promotions")}
                  className="text-xl font-bold hover:text-blue-color uppercase"
                />
              </div>
            </div>
          </div>

          {/* right */}
          <div className="flex items-center gap-0.5 tab:gap-4 laptop:gap-5 mobile-sign-in">
            <SearchGames />

            {isLoggedIn ? (
              <>
                <AfterLogin />
              </>
            ) : (
              <>
                <SignIn name={com("Sign In")} />
                <SignInModal />
                <SignUp />
                <SignUpModal />
                <DuplicateAccountModal />
              </>
            )}

            <div className="hidden tab:block">
              {/* <LanguageDropdown /> */}
              <LocalSwitcher />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
