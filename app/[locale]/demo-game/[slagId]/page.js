import { DemoGame } from "@/components/playerFrontend";

const page = ({ params }) => {
  const { slagId } = params;
  return (
    <>
      <DemoGame slagId={slagId} />
    </>
  );
};

export default page;
