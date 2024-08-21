"use client";

import { useLoading } from "@/context/LoadingContext";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import useAuth from "@/helpers/useAuth";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import TawkToChat from "./commons/chatting/Chatting";
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

  const shouldShowFooter =
    !route.includes("/play-game/") && !route.includes("/demo-game/");

  const [showSidebar, setShowSidebar] = useState(false);
  const [showSidebarMobile, setShowSidebarMobile] = useState(true);
  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
    setShowSidebarMobile(!showSidebarMobile);
  };

  // Function to close the mobile sidebar
  const closeMobileSidebar = () => {
    setShowSidebarMobile(true);
  };

  const { loading } = useLoading();

  // State to track if it's a mobile device
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1023);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check for mobile device
    setIsMobile(window.innerWidth <= 1023);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* <UseScrollToTop /> */}
      <Navbar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        handleSidebarToggle={handleSidebarToggle}
        showSidebarMobile={showSidebarMobile}
        setShowSidebarMobile={setShowSidebarMobile}
      />
      <div className="flex items-center justify-between laptop:gap-10">
        {/* sidebar */}
        <div className="transition-all ease-in-out duration-500">
          <Sidebar
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            handleSidebarToggle={handleSidebarToggle}
            showSidebarMobile={showSidebarMobile}
            setShowSidebarMobile={setShowSidebarMobile}
            closeMobileSidebar={closeMobileSidebar}
          />
        </div>
        {/* main */}

        {isMobile === true ? (
          <div
            className={`transition-all ease-in-out duration-500 pt-[65px] laptop:pr-6 pb-16 w-full`}
          >
            <main>
              {loading && <CustomSkeleton hasImage={true} hasText={true} />}
              {/* {loading && <LoadingPage />} */}

              {!loading && (
                <>
                  {children}
                  <WeekPromotion />
                  {isLoggedIn && (
                    <>
                      <GiftBox />
                      <SideWheel />
                    </>
                  )}
                  {/* <SideWheel /> */}
                  {shouldShowFooter && <Footer />}
                  {shouldShowFooter && <FooterMenu />}
                  {/* Render TawkToChat only on desktop screens */}
                  {shouldShowFooter && !isMobile && <TawkToChat />}
                </>
              )}
            </main>
          </div>
        ) : (
          <div
            className={`transition-all ease-in-out duration-500 pt-[100px] laptop:pr-6 pb-16 ${
              showSidebar ? "w-[calc(100%-100px)]" : "w-[calc(100%-300px)]"
            }`}
          >
            <main>
              {loading && <CustomSkeleton hasImage={true} hasText={true} />}
              {/* {loading && <LoadingPage />} */}

              {!loading && (
                <>
                  {children}
                  <WeekPromotion />
                  {isLoggedIn && (
                    <>
                      <GiftBox />
                      <SideWheel />
                    </>
                  )}
                  {shouldShowFooter && <Footer />}
                  {shouldShowFooter && <FooterMenu />}
                  {shouldShowFooter && <TawkToChat />}

                  {/* {shouldShowFooter && <SideWheel />} */}
                </>
              )}
            </main>
          </div>
        )}
      </div>
    </>
  );
};

export default Layout;
