import Banner from "@/components/commons/banner/Banner";
import { LiveCasino } from "@/components/playerFrontend";
import { fetchLiveCasinoGames } from "@/lib/fetchLiveCasinoAPI";
import { Suspense } from "react";
import { FadeLoader } from "react-spinners";

export const metadata = {
  title: "Europa-Slot",
};

const Page = async () => {
  const getLiveCasinoGamesData = await fetchLiveCasinoGames();

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

      <Suspense
        fallback={
          <h3 className="flex items-center justify-center gap-2 text-white">
            <FadeLoader color="#FFF" />
          </h3>
        }
      >
        <LiveCasino initialGamesData={getLiveCasinoGamesData} />
      </Suspense>
    </>
  );
};

export default Page;
