"use client";

import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CustomSkeleton = ({ hasImage, hasText }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    // <Skeleton
    //   count={hasText ? 1 : 0} // Show one line of text if hasText is true
    //   height={hasImage ? 500 : 0} // Set height to 500px if hasImage is true
    // />
    <SkeletonTheme baseColor="#161421" highlightColor="#2B2740">
      <Skeleton count={hasText ? 2 : 0} height={hasImage ? 200 : 0} />
    </SkeletonTheme>
  );
};

export default CustomSkeleton;
