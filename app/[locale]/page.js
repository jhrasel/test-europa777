// "use client";

import Banner from "@/components/commons/banner/Banner";
import { Home } from "@/components/playerFrontend";
import { fetchGameWinner, fetchHomePageGames } from "@/lib/fetchHomeAPI";

const Page = async () => {
  const gethHomePageGames = await fetchHomePageGames();
  const getGameWinnerData = await fetchGameWinner();

  return (
    <>
      <Banner />

      <Home
        gethHomePageGames={gethHomePageGames}
        getGameWinnerData={getGameWinnerData}
      />
    </>
  );
};

export default Page;
