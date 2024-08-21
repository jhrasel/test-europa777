"use client";

import { H3, H5, UIImage } from "@/components/UI";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import useApi from "@/helpers/apiRequest";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import WheelBonusInfo from "./WheelBonusInfo";

export default function AfterLoginWheel() {
  const [wheelData, setWheelData] = useState(null);
  const { fetchData } = useApi();
  const t = useTranslations("wheelBonus");

  useEffect(() => {
    const fetchWheelData = async () => {
      const { data, error } = await fetchData("/player/getWheelBonus", "GET");
      if (data) {
        console.log("getWheelBonus", data.data);
        setWheelData(data.data);
      } else if (error) {
        toast.error(error.message);
      }
    };

    fetchWheelData();
  }, [fetchData]);

  return (
    <div className="mt-5">
      {wheelData ? (
        <>
          {wheelData?.is_duplicate_user ? (
            <div className="relative">
              <UIImage
                src="/images/wheel_transparent.png"
                className=" !h-[90%] tab:!h-[445px] !w-[90%] tab:!w-[450px] rounded-full m-auto"
              />
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="w-[90%] tab:w-[580px] m-auto bg-blue-color shadow-2xl rounded-xl p-5 tab:p-8 text-center">
                  <div className="text-center !text-white prizeInfoContainer">
                    <H3 name={t("duplicateUser")} className="!text-white" />
                    <H5
                      name={t("duplicateUserDes")}
                      className="my-2 !text-white"
                    />
                    <H5 name={t("plzLogin")} className="!text-white" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <WheelBonusInfo
              remainingTime={wheelData?.remaining_time}
              afterRegistration={wheelData?.remaining_days_after_register}
              madeDeposit={wheelData?.made_deposit ? true : false}
              daysLeft={wheelData?.days_left}
              wheelPrizes={wheelData?.wheel_prizes}
              prizeName={wheelData?.prize_name}
              spinWinNumber={
                wheelData?.spin?.win_number ? wheelData?.spin?.win_number : 0
              }
              winNumber={wheelData.win_number ? wheelData?.win_number : 0}
            />
          )}
        </>
      ) : (
        <CustomSkeleton hasImage={true} hasText={true} />
      )}
    </div>
  );
}
