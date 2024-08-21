"use client";

import CustomSkeleton from "@/helpers/CustomSkeleton";
import useApi from "@/helpers/apiRequest";
import useBalance from "@/hook/useBalance";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Card, H5 } from "../UI";
import toast from "react-hot-toast";

export const PlayerHome = () => {
  // ;
  const { fetchData } = useApi();

  const [userData, setUserData] = useState("");
  const t = useTranslations("playerDashboardPage");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from the API
        const { data, error } = await fetchData("/player/getProfile", "GET");

        if (data) {
          setUserData(data.Player);
        } else if (error) {
          console.error("API Request Error:", error);
          toast.error(
            error.message || "An error occurred while fetching profile data."
          );
        }
      } catch (err) {
        console.error("Unexpected Error:", err);
        toast.error("An unexpected error occurred. Please try again.");
      }
    };

    fetchUserData();
  }, [fetchData]);

  const balance = useBalance();

  if (balance === null) {
    return <CustomSkeleton hasImage={true} hasText={true} />; // or you can return a loader
  }

  return (
    <>
      <div className=" laptop:w-[60%] desktop:w-[40%] m-auto">
        <Card>
          {/* item */}
          <div className="flex items-center justify-between gap-3 mb-2">
            <H5 name={t("Balance")} className="!text-red-color" />
            <H5
              name={`${balance.total_balance} ${balance.currency}`}
              className="!font-bold !text-red-color"
            />
          </div>
          <div className="flex items-center justify-between gap-3 mb-2">
            <H5 name={t("Withdrawable")} />
            <H5
              name={`${balance.balance} ${balance.currency}`}
              className="!font-bold"
            />
          </div>
          {/* item */}
          <div className="flex items-center justify-between gap-3 mb-2">
            <H5 name={t("Lock By Bonus")} />
            <H5 name={balance.bonus_balance} className="!font-bold" />
          </div>
          {/* item */}
          {/* <div className="flex items-center justify-between gap-3 mb-2">
            <H5 name="Cashback" />
            <H5 name={balance.bonus_balance} className="!font-bold" />
          </div> */}
          {/* item */}
          {/* <div className="flex items-center justify-between gap-3 mb-5 border-t border-red-color">
            <H5 name={t("Total")} className="!text-white" />
            <H5
              name={`${balance.total_balance} ${balance.currency}`}
              className="!text-white !font-bold"
            />
          </div> */}
          {/* item */}
          {/* <div className="flex items-center justify-between gap-3 mb-2 ">
            <H5 name="Freespin" />
            <div className="flex items-center justify-end">
              <H5
                name="12"
                className="!text-slate-600 !font-bold border-r border-indigo-400 pr-2 mr-2"
              />
              <UILink
                name="Play"
                href=""
                className="!text-red-color !font-bold "
              />
            </div>
          </div> */}

          {/* Information */}
          {/* <div className="mt-5 text-center border-t border-gray-100 pt-3">
            <H3 name={userData.username} className="!text-indigo-600" />
            <H5 name={userData.email} />
            <P name={userData.country} />
          </div> */}
        </Card>
      </div>
    </>
  );
};
