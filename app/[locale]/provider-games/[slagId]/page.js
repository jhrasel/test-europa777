"use client";

import ProviderGames from "@/components/playerFrontend/providerGames/ProviderGames";
import { useParams } from "next/navigation";

const Page = () => {
  const { slagId } = useParams();

  return (
    <>
      <ProviderGames slagId={slagId} />
    </>
  );
};

export default Page;
