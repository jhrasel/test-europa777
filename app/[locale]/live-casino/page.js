import Banner from "@/components/commons/banner/Banner";
import { LiveCasino } from "@/components/playerFrontend";

export const metadata = {
  title: "Europa777-Live-Casino",
};

const page = () => {
  return (
    <>
      <Banner />
      <LiveCasino />
    </>
  );
};

export default page;
