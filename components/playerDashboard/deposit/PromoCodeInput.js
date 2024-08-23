"use client";

import { P, UIButton, UIInput, UILink } from "@/components/UI";
import useApi from "@/helpers/apiRequest";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ClockLoader } from "react-spinners";

const PromoCodeComponent = ({
  className,
  initialPromoCode,
  onPromoCodeChange,
}) => {
  const searchParams = useSearchParams();
  const promo = searchParams.get("promo");
  const { fetchData, error, isLoading } = useApi();

  const [promoCode, setPromoCode] = useState(initialPromoCode || promo || "");
  const [promoMessage, setPromoMessage] = useState(null);
  const locale = useLocale();
  const t = useTranslations("promoCode");

  const fetchPromoCodeDetails = async () => {
    const { data, error } = await fetchData("/player/promoCodeDetails", "GET");

    if (data) {
      setPromoMessage(data);
      // console.log("response promo", data);
    } else if (error) {
      toast.error(error.message);
    }
  };

  const validatePromoCode = async (code) => {
    const { data, error } = await fetchData("/player/addPromoCode", "POST", {
      code,
    });

    if (data && data.success) {
      toast.success(message);
      await fetchPromoCodeDetails();
    } else if (error) {
      console.error("API Request Error:", error);
      toast.error(
        error.message || "An unexpected error occurred. Please try again."
      );
    }
  };

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
    if (onPromoCodeChange) {
      onPromoCodeChange(e.target.value);
    }
  };

  const handleAddPromoCode = async () => {
    await validatePromoCode(promoCode);
  };

  const handleBlur = () => {
    validatePromoCode(promoCode);
  };

  const handleRemovePromoCode = async () => {
    const { data, error } = await fetchData("/player/removePromoCode", "POST", {
      code: promoCode,
    });
    if (data?.success) {
      setPromoCode("");
      toast.success(data.message);
      await fetchPromoCodeDetails();
    } else {
      console.error("API Request Error:", error);
      toast.error(
        error.message || "An unexpected error occurred. Please try again."
      );
    }
  };

  useEffect(() => {
    fetchPromoCodeDetails();
  }, []);

  return (
    <div
      className={`w-[100%] laptop:w-[50%] desktop:w-[40%] py-3 mt-3 border-y border-gray-150 ${className}`}
    >
      <div className="">
        <P name={t("title1")} className="mb-2" />
      </div>
      <div className="flex w-full items-center gap-2">
        <UIInput
          name="promo_code"
          placeholder="Promo Code Optional"
          value={
            promoMessage?.promo_code ? promoMessage?.promo_code : promoCode
          }
          onChange={handlePromoCodeChange}
          onBlur={handleBlur}
        />

        {isLoading ? (
          <UIButton
            type="submit"
            icon={
              <ClockLoader
                className="text-heading-0"
                color="#FFF"
                size={30}
                margin={0}
              />
            }
            disabled
            className={`w-10 !bg-blue-color ${className}`}
          />
        ) : (
          <>
            {promoMessage?.promo_code ? (
              <button
                type="button"
                className="rounded-full bg-blue-color text-white px-5 py-1.5 text-lg hover:bg-blue-600"
                onClick={handleRemovePromoCode}
              >
                {t("remove")}
              </button>
            ) : (
              <button
                type="button"
                className="rounded-full bg-blue-color text-white px-5 py-1.5 text-lg hover:bg-blue-600"
                onClick={handleAddPromoCode}
              >
                {t("add")}
              </button>
            )}
          </>
        )}
      </div>

      <div className="flex items-center gap-1 mt-1">
        <P name={t("title2")} className="!text-text-color-primary !text-xs" />
        <UILink
          name={t("clickHere")}
          href={`/${locale}/bonus`}
          className="!text-text-color-primary !text-xs hover:!text-red-color"
          target="_blank"
        />
      </div>

      {promoMessage?.name && <P name={promoMessage.name} className="mt-2" />}
    </div>
  );
};

export default PromoCodeComponent;
