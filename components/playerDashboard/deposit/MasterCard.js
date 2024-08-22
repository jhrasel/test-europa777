"use client";
import { ErrorMessage, H4, P, UIImage, UIInput } from "@/components/UI";
import { ProfileUpdateModal } from "@/components/playerDashboard/profile/ProfileUpdateModal";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import SubmitButton from "@/helpers/SubmitButton";
import useApi from "@/helpers/apiRequest";
import useBalance from "@/hook/useBalance";
import { paymentCardValidation } from "@/validations/Valodation";
import { useFormik } from "formik";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoCardOutline } from "react-icons/io5";
import PromoCodeInput from "./PromoCodeInput";

export const MasterCard = ({ country }) => {
  const [depositAmount, setDepositAmount] = useState(25);
  const { fetchData, error, isLoading } = useApi();
  const router = useRouter();
  const locale = useLocale();
  const [needProfileUpdate, setNeedProfileUpdate] = useState(false);

  const handleButtonClick = (amount) => {
    setDepositAmount(amount);
  };

  const handleInputChange = (e) => {
    setDepositAmount(e.target.value);
  };

  const handleDeposit = () => {
    // Implement your deposit logic here using the 'depositAmount' state
    `Depositing ${depositAmount} CAD`;
  };

  let gateway = "card";
  let card = "MASTERCARD";
  let crypto_currency = "";

  // if (country === "Canada") {
  //   card = "MASTERCARD";
  // } else {
  //   crypto_currency = "MASTERCARD";
  // }

  const initialValues = {
    card_cvv: "",
    card_expiry: "",
    deposit_amount: "",
    card_number: "",
    gateway: gateway,
    card: card || null,
    crypto_currency: crypto_currency || null,
  };

  // handleLoginSuccess
  const handleResponse = (responseData) => {
    formik.resetForm();
    if (responseData?.success) {
      toast.success(responseData.message);
      if (responseData?.redirectUrl) {
        window.location.href = responseData.redirectUrl;
      }
    } else {
      toast.error(responseData.message);
    }
  };

  const handleSubmit = async (values) => {
    values.deposit_amount = depositAmount.toString();

    try {
      const { data, status, error } = await fetchData(
        "/player/makeDeposit",
        "POST",
        values
      );

      if (data) {
        handleResponse(data);
      } else if (error) {
        if (status === 422) {
          setNeedProfileUpdate(true);
        } else {
          console.error("API Request Error:", error);
          toast.error(
            error.message || "An unexpected error occurred. Please try again."
          );
        }

        // else if (status === 401) {
        //   router.push(`/${locale}/player-dashboard/verification`);
        // }
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  // formik
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: paymentCardValidation,
    onSubmit: handleSubmit,
  });

  const balance = useBalance();

  const formatExpiryDate = (value) => {
    const inputVal = value.replace(/\D/g, "");
    if (inputVal.length > 2) {
      return `${inputVal.slice(0, 2)}/${inputVal.slice(2, 4)}`;
    }
    return inputVal;
  };

  const formatCVV = (value) => {
    return value.replace(/\D/g, "").slice(0, 3);
  };

  const handleExpiryDateChange = (e) => {
    const formattedValue = formatExpiryDate(e.target.value);
    formik.setFieldValue("card_expiry", formattedValue);
  };

  const handleCVVChange = (e) => {
    const formattedValue = formatCVV(e.target.value);
    formik.setFieldValue("card_cvv", formattedValue);
  };

  if (balance === null) {
    return <CustomSkeleton hasImage={false} hasText={true} />;
  }

  return (
    <>
      <div className="bg-white p-2 tab:p-5 rounded-lg">
        <div className="flex items-center gap-2">
          <UIImage
            src="/images/bank-img/mastercard.png"
            className="!w-16 tab:!w-32 !h-auto object-cover"
          />
          <H4
            name={`Min: 10 ${balance.currency}`}
            className="!text-red-color"
          />
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="border-t border-indigo-300 pt-3 mt-3">
            <H4 name="" className="mt-3 !text-indigo-600" />
            <div
              className="flex flex-wrap items-center 
gap-1 tab:gap-3"
            >
              {[25, 50, 100, 200, 500].map((amount) => (
                <div
                  key={amount}
                  onClick={() => handleButtonClick(amount)}
                  className="link__bg py-2 px-2 tab:px-8 rounded-full cursor-pointer text-white text-[11px] tab:text-lg font-semibold"
                >
                  {`${amount} ${balance.currency}`}
                </div>
                // <UIButton
                //   key={amount}
                //   name={`${amount} ${balance.currency}`}
                //   className="bg-red-color"
                //   onClick={() => handleButtonClick(amount)}
                // />
              ))}
            </div>
            <div className="mt-5">
              <div className="flex flex-col items-center gap-3">
                {/* Deposit */}
                <div className=" w-[100%] laptop:w-[50%] desktop:w-[40%]">
                  <P
                    name={`Deposit Amount ${balance.currency}:`}
                    className="mb-2"
                  />
                  <UIInput
                    type="text"
                    name="deposit_amount"
                    placeholder="Deposit Amount"
                    value={depositAmount}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Card number */}
                <div className=" w-[100%] laptop:w-[50%] desktop:w-[40%] relative">
                  <P name="Card Number" className="mb-2" />
                  <UIInput
                    type="number"
                    name="card_number"
                    placeholder="Card Number"
                    onChange={formik.handleChange}
                    value={formik.values.card_number}
                    className={
                      formik.errors.card_number
                        ? "rounded-lg border-2 border-red-600"
                        : "rounded-lg"
                    }
                  />

                  <div className="absolute top-9 right-1">
                    <IoCardOutline className="text-3xl" />
                  </div>
                  {/* error */}
                  {formik.errors.card_number && (
                    <ErrorMessage errorName={formik.errors.card_number} />
                  )}
                </div>

                <div className="w-[100%] laptop:w-[50%] desktop:w-[40%] grid grid-cols-2 gap-2">
                  {/* Expiry Date */}
                  <div className="">
                    <P name="Expiry Date" className="mb-2" />
                    <UIInput
                      type="text"
                      name="card_expiry"
                      placeholder="MM/YY"
                      onChange={handleExpiryDateChange}
                      value={formik.values.card_expiry}
                      className={
                        formik.errors.card_expiry
                          ? "rounded-lg border-2 border-red-600"
                          : "rounded-lg"
                      }
                    />
                    {/* error */}
                    {formik.errors.card_expiry && (
                      <ErrorMessage errorName={formik.errors.card_expiry} />
                    )}
                  </div>

                  {/* CVV */}
                  <div className="">
                    <P name="CVV:" className="mb-2" />
                    <UIInput
                      type="password"
                      placeholder="***"
                      name="card_cvv"
                      onChange={handleCVVChange}
                      value={formik.values.card_cvv}
                      className={
                        formik.errors.card_cvv
                          ? "rounded-lg border-2 border-red-600"
                          : "rounded-lg"
                      }
                    />
                    {/* error */}
                    {formik.errors.card_cvv && (
                      <ErrorMessage errorName={formik.errors.card_cvv} />
                    )}
                  </div>
                </div>
                {/* promo Code */}
                <PromoCodeInput fetchData={fetchData} isLoading={isLoading} />
              </div>

              {/* SubmitButton */}
              <SubmitButton
                name="Deposit"
                isLoading={isLoading}
                className="!w-auto m-auto"
              />
            </div>
          </div>
        </form>
        <ProfileUpdateModal
          openModal={needProfileUpdate}
          handleModal={setNeedProfileUpdate}
        />
      </div>
    </>
  );
};
