import Banner from "@/components/commons/banner/Banner";
import { Slots } from "@/components/playerFrontend";
export const metadata = {
  title: "Europa-Slot",
};
const page = () => {
  return (
    <>
      <Banner />
      <Slots />
    </>
  );
};

export default page;
