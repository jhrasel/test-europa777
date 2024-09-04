"use client";
import { ErrorMessage, H6, P, UIImage, UIInput } from "@/components/UI";
import SubmitButton from "@/helpers/SubmitButton";
import useApi from "@/helpers/apiRequest";
import { bankWithdrawValidation } from "@/validations/Valodation";
import { Select } from "antd";
import countryList from "country-list";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import ShowBalance from "./ShowBalance";

// Get the list of countries
const countries = countryList.getData();

export const Bank = () => {
  const { fetchData, error, isLoading } = useApi();
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleCountryChange = (selectedCountry) => {
    formik.setFieldValue("beneficiary_bank_country", selectedCountry);
  };

  // Country map data
  const countryOptions = countries.map((beneficiary_bank_country) => ({
    value: beneficiary_bank_country.name,
    label: beneficiary_bank_country.name,
  }));

  // this modal close SignINForm
  const handleLoginSuccess = () => {
    setIsModalOpen(false);
  };

  const initialValues = {
    amount: "",
    payment_method: "Bank",
    beneficiary_name: "",
    beneficiary_iban: "",
    beneficiary_swift: "",
    beneficiary_bank_name: "",
    beneficiary_bank_address: "",
    beneficiary_bank_country: "",
  };

  // handleLoginSuccess
  const handleResponse = (responseData) => {
    formik.resetForm();
    if (responseData?.success) {
      toast.success(responseData.message);
    } else {
      toast.error(responseData.message);
    }
  };

  const handleSubmit = async (values) => {
    const { data, error } = await fetchData(
      "/player/makeWithdraw",
      "POST",
      values
    );

    if (data) {
      handleResponse(data);
      toast.success("Withdrawal request submitted successfully!");
    } else if (error) {
      toast.error(responseData.message);
    }
  };

  // formik
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: bankWithdrawValidation,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="bg-white p-2 tab:p-5 rounded-lg">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center gap-1 ">
            <UIImage
              src="/images/bank-img/bank.png"
              alt="deposit"
              className="!w-auto !h-10 tab:!h-16 object-cover"
            />
            <div className="">
              {/* <H4 name="Bank" className="!text-red-color" /> */}
              <H6
                name="Min 500.00"
                className="!text-blue-color font-bold !text-sm tab:!text-lg -mt-1.5"
              />
            </div>
          </div>

          <ShowBalance />
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="border-t border-indigo-300 pt-3 mt-3">
            {/* deposit */}
            <div className="mt-5">
              <div className="tab:flex items-center gap-5">
                {/* Withdraw */}
                <div className="mb-5 w-full tab:w-[30%]">
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
                {/* Beneficiary Name: */}
                <div className="mb-5 w-full tab:w-[30%]">
                  <P name="Beneficiary Name:" className="mb-2" />
                  <UIInput
                    type="text"
                    placeholder="Beneficiary Name"
                    name="beneficiary_name"
                    onChange={formik.handleChange}
                    value={formik.values.beneficiary_name}
                    className={
                      formik.errors.beneficiary_name
                        ? "rounded-lg border-2 border-red-600"
                        : "rounded-lg"
                    }
                  />
                  {/* error */}
                  {formik.errors.beneficiary_name && (
                    <ErrorMessage errorName={formik.errors.beneficiary_name} />
                  )}
                </div>
                {/* IBAN: */}
                <div className="mb-5 w-full tab:w-[30%]">
                  <P name="IBAN:" className="mb-2" />
                  <UIInput
                    type="text"
                    placeholder="IBAN"
                    name="beneficiary_iban"
                    onChange={formik.handleChange}
                    value={formik.values.beneficiary_iban}
                    className={
                      formik.errors.beneficiary_iban
                        ? "rounded-lg border-2 border-red-600"
                        : "rounded-lg"
                    }
                  />
                  {/* error */}
                  {formik.errors.beneficiary_iban && (
                    <ErrorMessage errorName={formik.errors.beneficiary_iban} />
                  )}
                </div>

                {/* BIC/SWIFT: */}
                <div className="mb-5 w-full tab:w-[30%]">
                  <P name="BIC/SWIFT:" className="mb-2" />
                  <UIInput
                    type="text"
                    placeholder="BIC/SWIFT"
                    name="beneficiary_swift"
                    onChange={formik.handleChange}
                    value={formik.values.beneficiary_swift}
                    className={
                      formik.errors.beneficiary_swift
                        ? "rounded-lg border-2 border-red-600"
                        : "rounded-lg"
                    }
                  />
                  {/* error */}
                  {formik.errors.beneficiary_swift && (
                    <ErrorMessage errorName={formik.errors.beneficiary_swift} />
                  )}
                </div>
              </div>

              <div className="flex items-center gap-5">
                {/* Bank Name */}
                <div className="mb-5 w-full tab:w-[30%]">
                  <P name="Bank Name:" className="mb-2" />
                  <UIInput
                    type="text"
                    placeholder="Bank Name"
                    name="beneficiary_bank_name"
                    onChange={formik.handleChange}
                    value={formik.values.beneficiary_bank_name}
                    className={
                      formik.errors.beneficiary_bank_name
                        ? "rounded-lg border-2 border-red-600"
                        : "rounded-lg"
                    }
                  />
                  {/* error */}
                  {formik.errors.beneficiary_bank_name && (
                    <ErrorMessage
                      errorName={formik.errors.beneficiary_bank_name}
                    />
                  )}
                </div>
                {/* Bank Address: */}
                <div className="mb-5 w-full tab:w-[30%]">
                  <P name="Bank Address:" className="mb-2" />
                  <UIInput
                    type="text"
                    placeholder="Bank Address"
                    name="beneficiary_bank_address"
                    onChange={formik.handleChange}
                    value={formik.values.beneficiary_bank_address}
                    className={
                      formik.errors.beneficiary_bank_address
                        ? "rounded-lg border-2 border-red-600"
                        : "rounded-lg"
                    }
                  />
                  {/* error */}
                  {formik.errors.beneficiary_bank_address && (
                    <ErrorMessage
                      errorName={formik.errors.beneficiary_bank_address}
                    />
                  )}
                </div>
                {/* Bank Country: */}
                <div className="mb-5 w-full tab:w-[30%]">
                  <P name="Bank Country:" className="mb-2" />
                  <Select
                    showSearch
                    placeholder="Select a country"
                    value={selectedCountry}
                    onChange={(selectedCountry) => {
                      setSelectedCountry(selectedCountry);
                      handleCountryChange(selectedCountry);
                    }}
                    style={{ width: "100%" }}
                    options={countryOptions}
                    className={
                      formik.errors.beneficiary_bank_country
                        ? "rounded-lg border-2 border-red-600"
                        : "rounded-lg"
                    }
                  />
                  {/* error */}
                  {formik.errors.beneficiary_bank_country && (
                    <ErrorMessage
                      errorName={formik.errors.beneficiary_bank_country}
                    />
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
