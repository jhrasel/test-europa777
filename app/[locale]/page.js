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

const Page = async () => {
  const getTopGamesData = await fetchTopGames();
  const getHotGamesData = await fetchHotGames();
  const getLiveCasinoData = await fetchLiveCasinoGames();
  const getGameWinnerData = await fetchGameWinner();
  const getAllGameProvidersData = await fetchAllGameProviders();

  return (
    <>
      <Banner />

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
