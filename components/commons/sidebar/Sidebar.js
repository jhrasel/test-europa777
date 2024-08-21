// Ensure you're importing the useRouter hook from 'next/router'
import { usePathname } from "next/navigation";
import { Longsidebar } from "./Longsidebar";
import { Mobilesidebar } from "./Mobilesidebar";
import { Shortsidebar } from "./Shortsidebar";

const Sidebar = ({
  showSidebar,
  showSidebarMobile,
  closeMobileSidebar,
  setShowSidebar,
}) => {
  // Get the current route using the useRouter hook
  const router = usePathname();

  // Determine if the current route matches the '/play-game' route
  // const isPlayGameRoute = router.includes("/play-game");

  // if (isPlayGameRoute === true) {
  //   setShowSidebar(true);
  // }

  // Conditionally render the sidebar based on the route
  return (
    <>
      {/* Render Shortsidebar only if it's the '/play-game' route */}
      {/* {isPlayGameRoute && !showSidebar ? <Shortsidebar /> : <Longsidebar />} */}
      {showSidebar ? <Shortsidebar /> : <Longsidebar  />}

      {/* mobileSidebar */}
      {showSidebarMobile ? null : (
        <Mobilesidebar closeMobileSidebar={closeMobileSidebar} />
      )}
    </>
  );
};

export default Sidebar;
