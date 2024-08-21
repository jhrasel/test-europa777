"use client";

import { useRouter } from "next/navigation";

import { useEffect } from "react";
// import { useEffect } from "react";

// const UseScrollToTop = () => {
//   const pathname = usePathname();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);
// };

// export default UseScrollToTop;

const UseScrollToTop = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      const topElement = document.getElementById("top");
      if (topElement) {
        topElement.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo(0, 0);
      }
    };

    router.events?.on("routeChangeComplete", handleRouteChange);

    // Cleanup the event listener on unmount
    return () => {
      router.events?.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return null;
};

export default UseScrollToTop;
