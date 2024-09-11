import { CashbackDB } from "@/components/playerDashboard";

export const metadata = {
  title: "Europa777-Cashback",
};

const page = () => {
  return (
    <>
      {/* <CashbackDB /> */}
      <section className="promotion-db-page">
        {/* <VIP /> */}
        <CashbackDB />
      </section>
    </>
  );
};

export default page;
