"use client";

import { QuickDepositModal } from "@/components/playerDashboard/deposit/QuickDepositModal";
import { useLoading } from "@/context/LoadingContext";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import useAuth from "@/helpers/useAuth";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NewTwak from "./commons/chatting/NewTwak";
import Footer from "./commons/footer/Footer";
import FooterMenu from "./commons/footerMenu/FooterMenu";
import Navbar from "./commons/navbar/Navbar";
import Sidebar from "./commons/sidebar/Sidebar";
import WeekPromotion from "./commons/weekPromotion/WeekPromotion";
import SideWheel from "./playerFrontend/newWheelBonus/SideWheel";
import GiftBox from "./scratchCard/GiftBox";

const Layout = ({ children, showFooter = true, remainingTime }) => {
  const route = usePathname();
  const { isLoggedIn } = useAuth();
  const { loading } = useLoading();

  const shouldShowFooter =
    !route.includes("/play-game/") && !route.includes("/demo-game/");

  const [showSidebar, setShowSidebar] = useState(false);
  const [showSidebarMobile, setShowSidebarMobile] = useState(true);
  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
    setShowSidebarMobile(!showSidebarMobile);
  };

  const closeMobileSidebar = () => {
    setShowSidebarMobile(true);
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1023);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Navbar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        handleSidebarToggle={handleSidebarToggle}
        showSidebarMobile={showSidebarMobile}
        setShowSidebarMobile={setShowSidebarMobile}
      />
      <div className="flex items-center justify-between laptop:gap-10">
        <div className="transition-all ease-in-out duration-300">
          <Sidebar
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            handleSidebarToggle={handleSidebarToggle}
            showSidebarMobile={showSidebarMobile}
            setShowSidebarMobile={setShowSidebarMobile}
            closeMobileSidebar={closeMobileSidebar}
          />
        </div>
        <main
          className={`transition-all ease-in-out duration-300 ${
            isMobile
              ? "pt-[65px] w-full"
              : `pt-[100px] ${
                  showSidebar ? "w-[calc(100%-100px)]" : "w-[calc(100%-300px)]"
                }`
          }`}
        >
          {/* <NewTwak /> */}

          {loading && <CustomSkeleton hasImage={true} hasText={true} />}
          {!loading && (
            <>
              {children}
              {isLoggedIn && (
                <>
                  <WeekPromotion />
                  <GiftBox />
                  <SideWheel />
                  <QuickDepositModal />
                </>
              )}
              {shouldShowFooter && <Footer />}
              {shouldShowFooter && <FooterMenu />}
              {shouldShowFooter && !isMobile && <NewTwak />}
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Layout;
