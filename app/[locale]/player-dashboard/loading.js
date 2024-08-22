import { FadeLoader } from "react-spinners";

export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-center w-full h-[60vh]">
        <FadeLoader color="#FFF" />
      </div>
    </>
  );
}
