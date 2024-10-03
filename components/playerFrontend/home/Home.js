"use client";
import LoadingPage from "@/components/Loading";
import { Suspense } from "react";
import { LiveCasinoHomePage } from "../liveCasino/LiveCasino";
import { AllProviders } from "./AllProviders";
import { BonusPromotion } from "./BonusPromotion";
import GameWinner from "./GameWinner";
import { HotGames } from "./HotGames";
import { NewGames } from "./NewGames";
import { RecentPalyGame } from "./RecentPalyGame";
import { TopGames } from "./TopGames";
import { WelcomeBonus } from "./WelcomeBonus";

export const Home = ({
  getNewGamesData,
  getTopGamesData,
  getHotGamesData,
  getLiveCasinoData,
  getGameWinnerData,
  getAllGameProvidersData,
}) => {
  // console.log("getTopGamesData", getTopGamesData);
  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <GameWinner getGameWinnerData={getGameWinnerData} />
      </Suspense>

      <Suspense fallback={<LoadingPage />}>
        <RecentPalyGame />
      </Suspense>

      <Suspense fallback={<LoadingPage />}>
        <NewGames getNewGamesData={getNewGamesData} />
      </Suspense>

      <Suspense fallback={<LoadingPage />}>
        <TopGames getTopGamesData={getTopGamesData} />
      </Suspense>

      <WelcomeBonus />

      <Suspense fallback={<LoadingPage />}>
        <LiveCasinoHomePage getLiveCasinoData={getLiveCasinoData} />
      </Suspense>

      <BonusPromotion />

      <Suspense fallback={<LoadingPage />}>
        <HotGames getHotGamesData={getHotGamesData} />
      </Suspense>

      <Suspense fallback={<LoadingPage />}>
        <AllProviders getAllGameProvidersData={getAllGameProvidersData} />
      </Suspense>
    </>
  );
};
