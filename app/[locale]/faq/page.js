import FaqComponent from "@/components/playerFrontend/faq/FaqComponent";
import Link from "next/link";

export const metadata = {
  title: "FAQ",
};

const page = () => {
  return (
    <>
     <FaqComponent/>
    </>
  );
};

export default page;
