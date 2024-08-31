import Banner from "@/components/commons/banner/Banner";
import { Slots } from "@/components/playerFrontend";
import { fetchSlotsGames } from "@/lib/fetchSlotsAPI";
import { Suspense } from "react";
import { FadeLoader } from "react-spinners";

export const metadata = {
  title: "Europa-Slot",
};

const Page = async () => {
  const getSlotGamesData = await fetchSlotsGames();

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
        <Slots initialGamesData={getSlotGamesData} />
      </Suspense>
    </>
  );
};

export default Page;
