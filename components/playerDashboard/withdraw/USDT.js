"use client";
import { ErrorMessage, H6, P, UIImage, UIInput } from "@/components/UI";
import SubmitButton from "@/helpers/SubmitButton";
import useApi from "@/helpers/apiRequest";
import { usdWithdrawValidation } from "@/validations/Valodation";
import { Select } from "antd";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import ShowBalance from "./ShowBalance";

export const USDT = () => {
  const { fetchData, error, isLoading } = useApi();
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  // Ant Select
  const handleCurrencyChange = (selectedCurrency) => {
    formik.setFieldValue("crypto_currency", selectedCurrency);
  };

  const currencyOptions = [
    { value: "CAD", label: "CAD" },
    { value: "USD", label: "USD" },
    { value: "GBP", label: "GBP" },
    { value: "EUR", label: "EUR" },
    { value: "AUD", label: "AUD" },
  ];

  // this modal close SignINForm
  const handleLoginSuccess = () => {
    setIsModalOpen(false);
  };

  const initialValues = {
    amount: "",
    crypto_currency: "USD",
    crypto_address: "",
    payment_method: "Crypto",
  };

  // handleLoginSuccess
  const handleResponse = (responseData) => {
    formik.resetForm();
    if (responseData?.success) {
      toast.success(responseData.message || "Action completed successfully.");
    } else {
      toast.error(
        responseData.message || "An error occurred. Please try again."
      );
    }
  };

  // submit Form
  const handleSubmit = async (values) => {
    const { data, error } = await fetchData(
      "/player/makeWithdraw",
      "POST",
      values
    );

    if (data) {
      handleResponse(data);
    } else if (error) {
      console.error("API Request Error:", error);
      toast.error(
        error.message ||
          "Failed to submit the withdrawal request. Please try again."
      );
    }
  };

  // formik
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: usdWithdrawValidation,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="bg-white p-2 tab:p-5 rounded-lg">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center gap-2 ">
            <UIImage
              src="/images/bank-img/usdt.png"
              alt="deposit"
              className="!w-16 tab:!w-32 object-cover"
            />
            <H6
              name="Min 50.00"
              className="!text-blue-color font-bold !text-sm tab:!text-lg -mt-1.5"
            />
          </div>

          <ShowBalance />
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="border-t border-indigo-300 pt-3 mt-3">
            {/* deposit */}
            <div className="mt-5">
              <div className=" tab:flex items-center gap-5">
                {/* Withdraw */}
                <div className="mb-5 tab:w-[30%]">
                  <P name="Withdraw Amount:" className="mb-2" />
                  <UIInput
                    type="text"
                    placeholder="Withdraw Amount"
                    name="amount"
                    onChange={formik.handleChange}
                    value={formik.values.amount}
                    className={
                      formik.errors.amount
                        ? "rounded-lg border-2 border-red-600"
                        : "rounded-lg"
                    }
                  />
                  {/* error */}
                  {formik.errors.amount && (
                    <ErrorMessage errorName={formik.errors.amount} />
                  )}
                </div>
                {/* Crypto Currency */}
                <div className="mb-5 tab:w-[30%]">
                  <P name="Crypto Currency" className="mb-2" />
                  <Select
                    showSearch
                    placeholder="Select a currency"
                    value={selectedCurrency}
                    onChange={(selectedCurrency) => {
                      setSelectedCurrency(selectedCurrency);
                      handleCurrencyChange(selectedCurrency);
                    }}
                    style={{ width: "100%" }}
                    options={currencyOptions}
                    className={
                      formik.errors.crypto_currency
                        ? "rounded-lg border-2 border-red-600"
                        : "rounded-lg"
                    }
                  />
                  {/* error */}
                  {formik.errors.crypto_currency && (
                    <ErrorMessage errorName={formik.errors.crypto_currency} />
                  )}
                </div>
                {/* Crypto Address */}
                <div className="mb-5 tab:w-[30%]">
                  <P name="Crypto Address:" className="mb-2" />
                  <UIInput
                    type="text"
                    placeholder="Crypto Address"
                    name="crypto_address"
                    onChange={formik.handleChange}
                    value={formik.values.crypto_address}
                    className={
                      formik.errors.crypto_address
                        ? "rounded-lg border-2 border-red-600"
                        : "rounded-lg"
                    }
                  />
                  {/* error */}
                  {formik.errors.crypto_address && (
                    <ErrorMessage errorName={formik.errors.crypto_address} />
                  )}
                </div>
              </div>
              {/* SubmitButton */}
              <SubmitButton
                name="Withdraw"
                isLoading={isLoading}
                className="!w-auto"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
