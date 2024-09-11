"use client";
import { P, UIImage, UIInput, UILink } from "@/components/UI";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import SubmitButton from "@/helpers/SubmitButton";
import useApi from "@/helpers/apiRequest";
import useBalance from "@/hook/useBalance";
import { Checkbox, Select } from "antd";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";
import PromoCodeInput from "./PromoCodeInput";

export const Flexepin = () => {
  const [depositAmount, setDepositAmount] = useState(25);
  const { fetchData, isLoading } = useApi();
  const [selectedCurrency, setSelectedCurrency] = useState("USD/CAD");
  const [isAgreed, setIsAgreed] = useState(false);

  const t = useTranslations("Common");

  const promoCodeT = useTranslations("promoCode");
  const [havePromoCode, setHavePromoCode] = useState(false);

  const handleHavePromoCode = () => {
    setHavePromoCode(true);
  };

  const handleHavePromoCodeHide = () => {
    setHavePromoCode(false);
  };

  const onChange = (e) => {
    setIsAgreed(e.target.checked);
  };

  // Ant Select
  const handleCurrencyChange = (selectedCurrency) => {
    formik.setFieldValue("voucher_currency", selectedCurrency);
  };

  const handleResponse = (responseData) => {
    formik.resetForm();
    if (responseData?.success) {
      toast.success(responseData.message);
      if (responseData?.data?.redirect_url) {
        window.location.href = responseData.data.redirect_url;
      }
    } else {
      toast.error(responseData.message);
    }
  };

  const handleSubmit = async (values) => {
    if (!isAgreed) {
      toast.error("Please Accept The Terms and Condition First");
      return;
    }

    values.deposit_amount = depositAmount.toString();

    const { data, error } = await fetchData(
      "/player/makeDeposit",
      "POST",
      values
    );

    if (data) {
      handleResponse(data);
    } else if (error) {
      toast.error(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      deposit_amount: "",
      voucher_currency: "USD/CAD",
      voucher: "",
      gateway: "flexepin",
    },
    onSubmit: handleSubmit,
  });

  const balance = useBalance();

  if (balance === null) {
    return <CustomSkeleton hasImage={false} hasText={true} />;
  }

  return (
    <div className="bg-white p-2 tab:p-5 rounded-lg">
      <UIImage
        src="/images/bank-img/flexepin.png"
        alt="deposit"
        className="!w-16 tab:!w-32 !h-auto object-cover"
      />
      <form onSubmit={formik.handleSubmit}>
        <div className="border-t border-indigo-300 pt-3 mt-3">
          <div className="w-[100%] m-auto mt-2">
            <P name="Voucher Currency" className="mb-2" />
            <Select
              showSearch
              placeholder="Select a currency"
              value={selectedCurrency}
              onChange={(selectedCurrency) => {
                setSelectedCurrency(selectedCurrency);
                handleCurrencyChange(selectedCurrency);
              }}
              style={{ width: "100%" }}
              options={[
                { value: "USD/CAD", label: "USD/CAD" },
                { value: "EUR", label: "EUR" },
              ]}
              className={
                formik.errors.voucher_currency
                  ? "rounded-lg border-2 border-red-600"
                  : "rounded-lg"
              }
            />
          </div>

          <div className="mt-5">
            <div className="flex flex-col items-center gap-5">
              <div className="w-[100%] m-auto">
                <P name="Flexepin Voucher:" className="mb-2" />
                <UIInput
                  type="text"
                  name="voucher"
                  placeholder="Card Number"
                  onChange={formik.handleChange}
                  value={formik.values.voucher}
                  className={
                    formik.errors.voucher
                      ? "rounded-lg border-2 border-red-600"
                      : "rounded-lg"
                  }
                />
              </div>

              <div className="w-full deposit-have-promo">
                <div className="text-base text-text-color-primary flex items-center gap-1">
                  {promoCodeT("title1")},
                  <span
                    className="text-bg-color1 font-medium cursor-pointer italic"
                    onClick={handleHavePromoCode}
                  >
                    {promoCodeT("yes")}
                  </span>
                  <span
                    className="text-bg-color1 font-medium cursor-pointer italic"
                    onClick={handleHavePromoCodeHide}
                  >
                    / {promoCodeT("no")}
                  </span>
                </div>
                {havePromoCode && (
                  <div className="w-full">
                    <PromoCodeInput
                      fetchData={fetchData}
                      isLoading={isLoading}
                      className="!w-full"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center mt-3 gap-0.5">
              <Checkbox onChange={onChange} id="PromoCode" className="">
                <label htmlFor="PromoCode" className="mb-0.5 text-sm">
                  {t("I agree to the Flexepin")}
                  <UILink
                    href="https://www.flexepin.com/flexepin-terms-and-conditions-au/"
                    target="_blank"
                    name={t("terms & conditions")}
                    className="!text-blue-600 font-medium !text-sm pl-1"
                  />
                </label>
              </Checkbox>
            </div>

            <SubmitButton
              name="Deposit"
              isLoading={isLoading}
              className="!w-auto m-auto"
              disabled={!isAgreed}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
