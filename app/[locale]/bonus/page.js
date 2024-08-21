import { Bonus } from "@/components/playerFrontend";
import { fetchBonus } from "@/lib/fetchBonusAPI";

export const metadata = {
  title: "Europa-Bonus",
};

const BonusPage = async () => {
  const getBonusData = await fetchBonus();
  return (
    <>
      <Bonus getBonusData={getBonusData} />
    </>
  );
};

export default BonusPage;
