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
  try {
    // Fetch all data in parallel
    const [
      getTopGamesData,
      getHotGamesData,
      getLiveCasinoData,
      getGameWinnerData,
      getAllGameProvidersData,
    ] = await Promise.all([
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
      <h3 className="text-center text-white">
        Error loading data. Please try again later.
      </h3>
    );
  }
};

export default Page;
