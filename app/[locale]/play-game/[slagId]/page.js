import { PlayGame } from "@/components/playerFrontend";

const page = ({ params }) => {
  const { slagId } = params;

  return (
    <>
      <PlayGame slagId={slagId} />
    </>
  );
};

export default page;
