"use client";
import { useEffect } from "react";
import { FadeLoader } from "react-spinners";

export default function LoadingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="loading">
      <h2>
        <FadeLoader color="#FFF" />
      </h2>
    </div>
  );
}
