
import { ErrorMessage } from "@/components/UI";
import Banner from "@/components/commons/banner/Banner";
import { Home } from "@/components/playerFrontend";
import {
  fetchAllGameProviders,
  fetchGameWinner,
  fetchHotGames,
  fetchLiveCasinoGames,
  fetchNewGames,
  fetchTopGames,
} from "@/lib/fetchHomeAPI";
import { Suspense } from "react";
import { FadeLoader } from "react-spinners";

const Page = async () => {
  try {
    const [
      getNewGamesData,
      getTopGamesData,
      getHotGamesData,
      getLiveCasinoData,
      getGameWinnerData,
      getAllGameProvidersData,
    ] = await Promise.all([
      fetchNewGames(),
      fetchTopGames(),
      fetchHotGames(),
      fetchLiveCasinoGames(),
      fetchGameWinner(),
      fetchAllGameProviders(),
    ]);

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
          getNewGamesData={getNewGamesData}
          getTopGamesData={getTopGamesData}
          getHotGamesData={getHotGamesData}
          getLiveCasinoData={getLiveCasinoData}
          getGameWinnerData={getGameWinnerData}
          getAllGameProvidersData={getAllGameProvidersData}
        />
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <ErrorMessage errorName="Error loading data. Please try again later." />
    );
  }
};

export default Page;
