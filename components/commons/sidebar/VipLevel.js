"use client";

import { H5, H6, UILink } from "@/components/UI";
import { useLoading } from "@/context/LoadingContext";
import useApi from "@/helpers/apiRequest";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { RiVipCrown2Fill } from "react-icons/ri";

export default function VipLevel({ closeMobileSidebar }) {
  const { fetchData, error, isLoading } = useApi();
  const [data, setData] = useState({});
  const { loading } = useLoading();
  const t = useTranslations("Common");

  const locale = useLocale();

  useEffect(() => {
    const fetchGameData = async () => {
      const { data, error } = await fetchData("/player/getVipStatus", "GET");

      if (data) {
        setData(data.data);
      } else if (error) {
        // if (error.message) {
        //   toast.error(error.message);
        // } else {
        //   toast.error("An unexpected error occurred. Please try again.");
        // }
      }
    };

    fetchGameData();
  }, [fetchData]);

  // Check if data is null or undefined before accessing its properties
  // const points = data && data.points ? data.points : 0;
  // const progressPercentage = Math.floor((points / 50) * 100);
  const progressPercentage = data && data.percentage ? data.percentage : 0;

  const handleMenuItemClick = () => {
    closeMobileSidebar();
  };

  return (
    <>
      <div className="w-[80%] max-w-80 m-auto mt-3 mb-5">
        <div className="flex items-center justify-center gap-3 mb-1">
          <H5
            name={
              <>
                <RiVipCrown2Fill className="text-lg laptop:text-base" />
                {t("VIP Level")}:
              </>
            }
            className="text-text-color-primary flex items-center gap-2"
          />
          <H6
            name={data?.status}
            className="!text-white capitalize !text-lg laptop:!text-base"
          />
        </div>
        <UILink
          href={`/${locale}/vip`}
          onClick={handleMenuItemClick}
          name={
            <div className="w-full h-7 laptop:h-5 bg-gray-400 rounded-full">
              <div
                className="h-7 laptop:h-5 bg-blue-color rounded-full text-center text-white text-lg laptop:text-sm"
                style={{ width: `${progressPercentage}%` }}
              >
                {Math.round(progressPercentage)}%
              </div>
            </div>
          }
          className="w-full"
        />

        {/* <div className="flex items-center justify-center gap-3 mb-3">
          <H6 name={t("Next Level")} className="text-text-color-primary" />
          <H6 name={data?.next_level} className="!text-white capitalize" />
        </div> */}
      </div>
    </>
  );
}

export const VipLevelForShortSidebar = () => {
  const { fetchData, error, isLoading } = useApi();
  const [data, setData] = useState({});
  const { loading } = useLoading();
  const locale = useLocale();

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await fetchData("/player/getVipStatus", "GET");
        // console.log("get Vip Status", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching top games:", error);
      }
    };
    fetchGameData();
  }, [fetchData]);

  // Check if data is null or undefined before accessing its properties
  const points = data && data.points ? data.points : 0;
  const progressPercentage = Math.floor((points / 50) * 100);

  return (
    <>
      <div className="">
        <div className="flex items-center justify-center gap-3">
          <H5
            name={
              <>
                <RiVipCrown2Fill />
              </>
            }
            className="text-text-color-primary flex items-center gap-2"
          />
          <H6 name={data?.status} className="!text-white capitalize" />
        </div>
        <UILink
          onClick={handleMenuItemClick}
          href={`/${locale}/vip`}
          name={
            <div className="w-full h-5 bg-gray-200 rounded-full">
              <div
                className="h-5 bg-blue-color rounded-full text-center text-white text-sm"
                style={{ width: `${progressPercentage}%` }}
              >
                {progressPercentage}%
              </div>
            </div>
          }
          className="w-full"
        />

        <div className="flex items-center justify-center gap-3 mb-3">
          <H6 name={data?.next_level} className="!text-white capitalize" />
        </div>
      </div>
    </>
  );
};
