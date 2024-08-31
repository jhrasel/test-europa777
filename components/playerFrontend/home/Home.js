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
  getTopGamesData,
  getHotGamesData,
  getLiveCasinoData,
  getGameWinnerData,
  getAllGameProvidersData,
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
        <TopGames getTopGamesData={getTopGamesData} />
      </Suspense>

      <WelcomeBonus />

      <Suspense
        fallback={
          <h3 className="flex items-center gap-2 text-white">
            <FadeLoader color="#FFF" />
          </h3>
        }
      >
        <LiveCasinoHomePage getLiveCasinoData={getLiveCasinoData} />
      </Suspense>

      <BonusPromotion />

      <Suspense
        fallback={
          <h3 className="flex items-center gap-2 text-white">
            <FadeLoader color="#FFF" />
          </h3>
        }
      >
        <HotGames getHotGamesData={getHotGamesData} />
      </Suspense>

      <Suspense
        fallback={
          <h3 className="flex items-center gap-2 text-white">
            <FadeLoader color="#FFF" />
          </h3>
        }
      >
        <AllProviders getAllGameProvidersData={getAllGameProvidersData} />
      </Suspense>
    </>
  );
};
