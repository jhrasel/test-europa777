"use client";
import { Suspense } from "react";
import { FadeLoader } from "react-spinners";
import { LiveCasinoHomePage } from "../liveCasino/LiveCasino";
import { AllProviders } from "./AllProviders";
import { BonusPromotion } from "./BonusPromotion";
import GameWinner from "./GameWinner";
import { HotGames } from "./HotGames";
import { RecentPalyGame } from "./RecentPalyGame";
import { TopGames } from "./TopGames";
import { WelcomeBonus } from "./WelcomeBonus";

export const Home = ({
  getLiveCasinoData,
  getGameWinnerData,
  getAllGameProvidersData,

  gethHomePageGames,
}) => {
  // console.log("getTopGamesData", getTopGamesData);
  return (
    <>
      <Suspense
        fallback={
          <h3 className="flex items-center gap-2 text-white">
            <FadeLoader color="#FFF" />
          </h3>
        }
      >
        <GameWinner getGameWinnerData={getGameWinnerData} />
      </Suspense>

      <RecentPalyGame />

      <Suspense
        fallback={
          <h3 className="flex items-center gap-2 text-white my-2">
            <FadeLoader color="#FFF" />
          </h3>
        }
      >
        <TopGames gethHomePageGames={gethHomePageGames} />
      </Suspense>

      <WelcomeBonus />

      <Suspense
        fallback={
          <h3 className="flex items-center gap-2 text-white">
            <FadeLoader color="#FFF" />
          </h3>
        }
      >
        <LiveCasinoHomePage gethHomePageGames={gethHomePageGames} />
      </Suspense>

      <BonusPromotion />

      <Suspense
        fallback={
          <h3 className="flex items-center gap-2 text-white">
            <FadeLoader color="#FFF" />
          </h3>
        }
      >
        <HotGames gethHomePageGames={gethHomePageGames} />
      </Suspense>

      <Suspense
        fallback={
          <h3 className="flex items-center gap-2 text-white">
            <FadeLoader color="#FFF" />
          </h3>
        }
      >
        <AllProviders gethHomePageGames={gethHomePageGames} />
      </Suspense>
    </>
  );
};
