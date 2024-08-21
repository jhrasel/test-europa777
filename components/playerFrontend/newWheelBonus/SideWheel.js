import { H6, UILink } from "@/components/UI";
import useApi from "@/helpers/apiRequest";
import useAuth from "@/helpers/useAuth";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SideWheel({}) {
  const { isLoggedIn } = useAuth();

  const [sideWheel, setSideWheel] = useState(null);

  const { fetchData } = useApi();

  const [timer, setTimer] = useState(null);

  const locale = useLocale();

  useEffect(() => {
    const fetchWheelData = async () => {
      const { data, error } = await fetchData("/player/getWheelBonus", "GET");

      if (data) {
        setSideWheel(data.data.remaining_time);

        setTimer(
          setTimeout(() => {
            setSideWheel(0);
          }, data.data.remaining_time)
        );
      } else if (error) {
        toast.error(error.message);
      }
    };

    fetchWheelData();

    // Cleanup timer on unmount
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [fetchData]);

  return (
    <>
      {sideWheel === 0 && (
        <div className="bg-red-500 fixed bottom-36 tab:bottom-48 right-0 py-1.5 px-1.5  text-center z-[99]">
          <UILink
            href={`/${locale}/wheel-bonus`}
            name={
              <div className="relative">
                <Image
                  src="/images/side-wheel.png"
                  width="50"
                  height="50"
                  className="rounded-full animate-spin-slow !w-8 tab:!w-10 !h-8 tab:!h-10 m-auto"
                  alt="wheel-img"
                />
                <div className="mt-1">
                  <H6
                    name="Wheel"
                    className="!text-white !text-[10px] tab:!text-sm"
                  />
                  <H6
                    name="Bonus"
                    className="!text-white !text-[10px] tab:!text-sm -mt-1 tab:mt-0"
                  />
                </div>
              </div>
            }
          />
        </div>
      )}
    </>
  );
}
