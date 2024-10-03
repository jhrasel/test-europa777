"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import PromoCodeInput from "./PromoCodeInput";

const HavePromoCode = ({ fetchData, isLoading }) => {
  const [isPromoCode, setIsPromoCode] = useState(false);
  const promoCodeT = useTranslations("promoCode");

  const handleIsPromoCode = () => {
    setIsPromoCode(true);
  };

  const handleIsPromoCodeHide = () => {
    setIsPromoCode(false);
  };

  return (
    <div className="w-full deposit-have-promo">
      <div className="text-base text-text-color-primary flex items-center gap-1">
        {promoCodeT("title1")},
        <span
          className="text-bg-color1 font-medium cursor-pointer italic"
          onClick={handleIsPromoCode}
        >
          {promoCodeT("yes")}
        </span>
        <span
          className="text-bg-color1 font-medium cursor-pointer italic"
          onClick={handleIsPromoCodeHide}
        >
          / {promoCodeT("no")}
        </span>
      </div>
      {isPromoCode && (
        <div className="w-full">
          <PromoCodeInput
            fetchData={fetchData}
            isLoading={isLoading}
            className="!w-full"
          />
        </div>
      )}
    </div>
  );
};

export default HavePromoCode;
