// "use client";

import Banner from "@/components/commons/banner/Banner";
import { Home } from "@/components/playerFrontend";
import {
  fetchAllGameProviders,
  fetchGameWinner,
  fetchHotGames,
  fetchLiveCasinoGames,
  fetchTopGames,
} from "@/lib/fetchHomeAPI";
import { Suspense } from "react";
import { FadeLoader } from "react-spinners";

const Page = async () => {
  const getTopGamesData = await fetchTopGames();

  const getHotGamesData = await fetchHotGames();
  const getLiveCasinoData = await fetchLiveCasinoGames();

  const getGameWinnerData = await fetchGameWinner();
  const getAllGameProvidersData = await fetchAllGameProviders();

  return (
    <>
      <Suspense
        fallback={
          <h3 className="flex items-center justify-center my-5 gap-2 text-white">
            <FadeLoader color="#FFF" />
          </h3>
        }
      >
        <Banner />
      </Suspense>

      <Home
        getTopGamesData={getTopGamesData}
        getHotGamesData={getHotGamesData}
        getLiveCasinoData={getLiveCasinoData}
        getGameWinnerData={getGameWinnerData}
        getAllGameProvidersData={getAllGameProvidersData}
      />
    </>
  );
};

export default Page;
