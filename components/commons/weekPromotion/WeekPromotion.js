"use client";

import { H4, P, UIButton, UIButtonWithoutBG, UILinkBG } from "@/components/UI";
import useApi from "@/helpers/apiRequest";
import useAuth from "@/helpers/useAuth";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function WeekPromotion() {
  const { fetchData, isLoading, setIsLoading } = useApi();
  const [totalDeposit, setTotalDeposit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const locale = useLocale();
  const t = useTranslations("popupPromotion");
  const router = useRouter();

  const getTitle = () => {
    const list = ["firstTitle", "secondTitle", "thirdTitle", "fourthTitle"];
    return list[totalDeposit] || "weektitle";
  };

  const getImage = () => {
    return `/images/bonus-img/deposit-bonus/${
      totalDeposit + 1
    }_deposit_popup.jpg`;
  };

  const getPromocode = () => {
    const codes = ["BONUS1", "BONUS2", "BONUS3", "BONUS4"];
    return totalDeposit < 4 ? `?promo=${codes[totalDeposit]}` : null;
  };

  useEffect(() => {
    let timeout;
    const lastShown = localStorage.getItem("lastModalShown");
    const currentTime = new Date().getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (
      isLoggedIn &&
      (!lastShown || currentTime - lastShown >= twentyFourHours)
    ) {
      timeout = setTimeout(() => {
        setShowModal(true);
        localStorage.setItem("lastModalShown", currentTime);
      }, 5000);
    }

    return () => clearTimeout(timeout);
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await fetchData(
        "/player/getDepositHistory",
        "GET"
      );

      if (data) {
        let count = 0;
        if (data?.deposits?.data) {
          count = data?.deposits?.data.filter(
            (item) => item.status === "completed"
          ).length;
        }
        setTotalDeposit(count);
      } else if (error) {
        console.error(error.message);
      }
    };

    fetchUserData();
  }, [fetchData]);

  const closeModal = () => {
    setShowModal(false);
    const currentTime = new Date().getTime();
    localStorage.setItem("lastModalShown", currentTime);
  };

  const copyPromoCode = (code) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        toast.success(`Promo code ${code} copied to clipboard`);
      })
      .catch((error) => {
        console.error("Failed to copy promo code:", error);
      });
  };

  const redirectToPromotion = () => {
    const code = getPromocode();
    router.push(`/${locale}/player-dashboard/deposit/${code}`);
    closeModal();
  };

  if (totalDeposit == null) return null;

  return (
    <>
      {isLoggedIn && (
        <div
          className={`fixed z-[9999] w-full inset-0 overflow-y-auto flex items-center justify-center ${
            showModal ? "block" : "hidden"
          }`}
        >
          <div className="flex items-center justify-center p-3 tab:p-4 w-full">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="fixed top-0 left-0 w-full h-full inset-0 bg-black opacity-75"></div>
            </div>
            <div
              className={`relative bg-[#232222] ${
                totalDeposit < 4 ? "w-[400px]" : "w-[1200px]"
              } p-2 tab:p-6 rounded-lg`}
            >
              <div className="mt-2">
                <H4
                  name={t(getTitle())}
                  className="!bg-bg-color3 !text-white py-3 text-center rounded-lg"
                />
                {totalDeposit < 4 ? (
                  <div className="w-full">
                    <div className="mt-5 w-full relative aspect-[125/199] cursor-pointer">
                      <Image
                        onClick={redirectToPromotion}
                        src={getImage()}
                        layout="fill"
                        objectFit="cover"
                        alt="Banner image"
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-4 flex justify-center gap-x-2">
                      <UIButtonWithoutBG
                        name="Cancel"
                        onClick={closeModal}
                        className="!border-0"
                      />
                      <UIButton
                        name="Claim bonus"
                        onClick={redirectToPromotion}
                        className=""
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 grid laptop:grid-cols-2 gap-5">
                    {/* item */}
                    <div className="rounded-lg grid grid-cols-3 items-center">
                      {/* left */}
                      <div className="bg-blue-color p-3 tab:p-5 rounded-l-lg h-full  flex items-center justify-center">
                        <H4
                          name={t("everyDayHour")}
                          className="!text-base tab:!text-lg !text-white text-center"
                        />
                      </div>
                      {/* right */}
                      <div className="bg-white p-3 tab:p-5 rounded-r-lg col-span-2 h-full">
                        <H4
                          name={t("everyDayTitle")}
                          className="!text-base tab:!text-lg !text-bg-color1"
                        />
                        <P name={t("everyDayDes")} className="!text-sm" />
                        <UILinkBG
                          href={`/${locale}/vip`}
                          name={t("everyDayBtn")}
                          className="mt-3 !text-sm"
                        />
                      </div>
                    </div>

                    {/* item */}
                    <div className="rounded-lg grid grid-cols-3 items-center">
                      {/* left */}
                      <div className="bg-blue-color p-3 tab:p-5 rounded-l-lg h-full  flex items-center justify-center">
                        <H4
                          name={t("everyHour")}
                          className="!text-base tab:!text-lg !text-white text-center"
                        />
                      </div>
                      {/* right */}
                      <div className="bg-white p-3 tab:p-5 rounded-r-lg col-span-2 h-full">
                        <H4
                          name={t("everyHourTitle")}
                          className="!text-base tab:!text-lg !text-bg-color1"
                        />
                        <P name={t("everyHourDes")} className="!text-sm" />
                        <UILinkBG
                          href={`/${locale}/wheel-bonus`}
                          name={t("everyHourBtn")}
                          className="mt-3 !text-sm"
                        />
                      </div>
                    </div>

                    {/* item */}
                    <div className="rounded-lg grid grid-cols-3 items-center">
                      {/* left */}
                      <div className="bg-blue-color p-3 tab:p-5 rounded-l-lg h-full  flex items-center justify-center">
                        <H4
                          name={t("monday")}
                          className="!text-base tab:!text-lg !text-white text-center"
                        />
                      </div>
                      {/* right */}
                      <div className="bg-white p-3 tab:p-5 rounded-r-lg col-span-2 h-full">
                        <H4
                          name={t("mondayTitle")}
                          className="!text-base tab:!text-lg !text-bg-color1"
                        />
                        <P name={t("mondayDes")} className="!text-sm" />
                        <button
                          className="link__bg ease-out duration-150 text-white py-1 laptop:py-1.5 px-4 tab:px-5 laptop:px-8 rounded-full !text-sm inline-flex items-center gap-2 font-normal border-2 border-blue-color mt-3"
                          onClick={() => copyPromoCode("HAPPY")}
                        >
                          {t("promoCode")}: HAPPY
                        </button>
                      </div>
                    </div>

                    {/* item */}
                    <div className="rounded-lg grid grid-cols-3 items-center">
                      {/* left */}
                      <div className="bg-blue-color p-3 tab:p-5 rounded-l-lg h-full  flex items-center justify-center">
                        <H4
                          name={t("tuesday")}
                          className="!text-base tab:!text-lg !text-white text-center"
                        />
                      </div>
                      {/* right */}
                      <div className="bg-white p-3 tab:p-5 rounded-r-lg col-span-2 h-full">
                        <H4
                          name={t("tuesdayTitle")}
                          className="!text-base tab:!text-lg !text-bg-color1"
                        />
                        <P name={t("depositDes")} className="!text-sm" />
                        <button
                          className="link__bg ease-out duration-150 text-white py-1 laptop:py-1.5 px-4 tab:px-5 laptop:px-8 rounded-full !text-sm inline-flex items-center gap-2 font-normal border-2 border-blue-color mt-3"
                          onClick={() => copyPromoCode("Match15")}
                        >
                          {t("promoCode")} MATCH22
                        </button>
                      </div>
                    </div>

                    {/* item */}
                    <div className="rounded-lg grid grid-cols-3 items-center">
                      {/* left */}
                      <div className="bg-blue-color p-3 tab:p-5 rounded-l-lg h-full  flex items-center justify-center">
                        <H4
                          name={t("wednesday")}
                          className="!text-base tab:!text-lg !text-white text-center"
                        />
                      </div>
                      {/* right */}
                      <div className="bg-white p-3 tab:p-5 rounded-r-lg col-span-2 h-full">
                        <H4
                          name={t("saturdaySundayTitle")}
                          className="!text-base tab:!text-lg !text-bg-color1"
                        />
                        <P name={t("depositDes")} className="!text-sm" />
                        <button
                          className="link__bg ease-out duration-150 text-white py-1 laptop:py-1.5 px-4 tab:px-5 laptop:px-8 rounded-full !text-sm inline-flex items-center gap-2 font-normal border-2 border-blue-color mt-3"
                          onClick={() => copyPromoCode("100LIVE")}
                        >
                          {t("promoCode")}: 100LIVE
                        </button>
                      </div>
                    </div>

                    {/* item */}
                    <div className="rounded-lg grid grid-cols-3 items-center">
                      {/* left */}
                      <div className="bg-blue-color p-3 tab:p-5 rounded-l-lg h-full  flex items-center justify-center">
                        <H4
                          name={t("thursday")}
                          className="!text-base tab:!text-lg !text-white text-center"
                        />
                      </div>
                      {/* right */}
                      <div className="bg-white p-3 tab:p-5 rounded-r-lg col-span-2 h-full">
                        <H4
                          name={t("thursdayTitle")}
                          className="!text-base tab:!text-lg !text-bg-color1"
                        />
                        <P name={t("depositDes")} className="!text-sm" />
                        <button
                          className="link__bg ease-out duration-150 text-white py-1 laptop:py-1.5 px-4 tab:px-5 laptop:px-8 rounded-full !text-sm inline-flex items-center gap-2 font-normal border-2 border-blue-color mt-3"
                          onClick={() => copyPromoCode("Match15")}
                        >
                          {t("promoCode")}: MATCH15
                        </button>
                      </div>
                    </div>

                    {/* item */}
                    <div className="rounded-lg grid grid-cols-3 items-center">
                      {/* left */}
                      <div className="bg-blue-color p-3 tab:p-5 rounded-l-lg h-full  flex items-center justify-center">
                        <H4
                          name={t("friday")}
                          className="!text-base tab:!text-lg !text-white text-center"
                        />
                      </div>
                      {/* right */}
                      <div className="bg-white p-3 tab:p-5 rounded-r-lg col-span-2 h-full">
                        <H4
                          name={t("fridayTitle")}
                          className="!text-base tab:!text-lg !text-bg-color1"
                        />
                        <P name={t("depositDes")} className="!text-sm" />
                        <button
                          className="link__bg ease-out duration-150 text-white py-1 laptop:py-1.5 px-4 tab:px-5 laptop:px-8 rounded-full !text-sm inline-flex items-center gap-2 font-normal border-2 border-blue-color mt-3"
                          onClick={() => copyPromoCode("FRIDAY7")}
                        >
                          {t("promoCode")}: FRIDAY7
                        </button>
                      </div>
                    </div>

                    {/* item */}
                    <div className="rounded-lg grid grid-cols-3 items-center">
                      {/* left */}
                      <div className="bg-blue-color p-3 tab:p-5 rounded-l-lg h-full  flex items-center justify-center">
                        <H4
                          name={t("saturdaySunday")}
                          className="!text-base tab:!text-lg !text-white text-center"
                        />
                      </div>
                      {/* right */}
                      <div className="bg-white p-3 tab:p-5 rounded-r-lg col-span-2 h-full">
                        <H4
                          name={t("saturdaySundayTitle")}
                          className="!text-base tab:!text-lg !text-bg-color1"
                        />
                        <P name={t("depositDes")} className="!text-sm" />

                        <button
                          className="link__bg ease-out duration-150 text-white py-1 laptop:py-1.5 px-4 tab:px-5 laptop:px-8 rounded-full !text-sm inline-flex items-center gap-2 font-normal border-2 border-blue-color mt-3"
                          onClick={() => copyPromoCode("WEEKEND")}
                        >
                          {t("promoCode")}: WEEKEND
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
