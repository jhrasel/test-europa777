import { H6, UILink } from "@/components/UI";
import { useLocale } from "next-intl";
import Image from "next/image";

export default function SideWheel({ remainingTime }) {
  const locale = useLocale();
  return (
    <>
      {remainingTime !== 0 && (
        <div className="bg-red-500 fixed top-[70%] right-0 p-0.5 text-center">
          <UILink
            href={`/${locale}/wheel-bonus`}
            name={
              <div className="relative">
                <Image
                  src="/images/side-wheel.png"
                  width="40"
                  height="40"
                  className="rounded-full animate-spin-slow !w-10 !h-10"
                  alt="wheel-img"
                />
                <div className="hidden tab:block mt-1">
                  <H6 name="Wheel" className="!text-white" />
                  <H6 name="Bonus" className="!text-white" />
                </div>
              </div>
            }
          />
        </div>
      )}
    </>
  );
}
