"use client";
import { H5, H6, UILink } from "@/components/UI";
import { useLoading } from "@/context/LoadingContext";
import useApi from "@/helpers/apiRequest";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { RiVipCrown2Fill } from "react-icons/ri";

export const VipLevelForShortSidebar = () => {
  const { fetchData, error, isLoading } = useApi();
  const [data, setData] = useState({});
  const { loading } = useLoading();
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

  return (
    <>
      <div className="">
        <div className="flex items-center justify-center gap-1">
          <H5
            name={
              <>
                <RiVipCrown2Fill />
              </>
            }
            className="text-text-color-primary flex items-center gap-2 text-xs"
          />
          <H6 name={data?.status} className="!text-white capitalize !text-xs" />
        </div>
        <UILink
          href="/vip"
          name={
            <div className="w-full h-5 bg-gray-200 rounded-full">
              <div
                className="h-5 bg-blue-color rounded-full text-center text-white text-sm"
                style={{ width: `${data.percentage}%` }}
              >
                {data.percentage}%
              </div>
            </div>
          }
          className="w-full"
        />

        <div className="flex items-center justify-center gap-1 mb-3">
          <H6
            name={data?.next_level}
            className="!text-white capitalize !text-xs"
          />
        </div>
      </div>
    </>
  );
};
