"use client";
import { useEffect } from "react";
import { FadeLoader } from "react-spinners";

export default function LoadingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <h3 className="flex items-center gap-2 text-white">
      <FadeLoader color="#FFF" />
    </h3>
  );
}
