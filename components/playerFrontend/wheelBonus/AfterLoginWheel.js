"use client";

import CustomSkeleton from "@/helpers/CustomSkeleton";
import useApi from "@/helpers/apiRequest";
import { useEffect, useState } from "react";
import WheelBonusInfo from "./WheelBonusInfo";
import { H4, UIImage } from "@/components/UI";

export default function AfterLoginWheel() {
  const [wheelData, setWheelData] = useState(null);
  const { fetchData } = useApi();

  useEffect(() => {
    const fetchWheelData = async () => {
      try {
        const response = await fetchData("/player/getWheelBonus", "GET");
        // console.log("getWheelBonus.data", response.data);
        setWheelData(response.data);
      } catch (error) {}
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
                <div className=" w-[620px] m-auto bg-gradient-to-r from-blue-color to-blue-600 shadow-2xl rounded-3xl p-5 text-center">
                  <div className="text-center !text-white prizeInfoContainer">
                    <H4 name={t("duplicateUser")} className="!text-white" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <WheelBonusInfo
              remainingTime={wheelData.remaining_time}
              afterRegistration={wheelData.remaining_days_after_register}
              madeDeposit={wheelData.made_deposit ? true : false}
              daysLeft={wheelData.days_left}
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
