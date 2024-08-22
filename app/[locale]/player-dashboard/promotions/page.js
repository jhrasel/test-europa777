import { Bonus } from "@/components/playerFrontend";
import { fetchBonus } from "@/lib/fetchBonusAPI";

export default async function Page() {
  const getBonusData = await fetchBonus();
  return (
    <section className="promotion-db-page">
      <Bonus getBonusData={getBonusData} />
    </section>
  );
}
