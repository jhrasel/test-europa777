"use client";
import { Card, H4 } from "@/components/UI"; // Import UIButton for the submit button
import SubmitButton from "@/helpers/SubmitButton";
import useApi from "@/helpers/apiRequest";
import useAuth from "@/helpers/useAuth";
import { Select } from "antd";
import { useFormik } from "formik";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SelfExclusion() {
  const { logout } = useAuth();
  const [userData, setUserData] = useState("");
  const { fetchData, error, isLoading } = useApi();
  const t = useTranslations("playerProfilePage");
  const locale = useLocale();

  const [selectedCurrency, setSelectedCurrency] = useState(
    "Choose time out duration"
  );

  // Ant Select
  const handleCurrencyChange = (selectedCurrency) => {
    formik.setFieldValue("timeout_duration", selectedCurrency);
  };

  const currencyOptions = [
    { value: "one_day", label: "One Day" },
    { value: "five_days", label: "Five Days" },
    { value: "one_week", label: "One Week" },
  ];

  const initialValues = {
    timeout_duration: "",
  };

  // handlePassChange
  const handlePassChange = (responseData) => {
    formik.resetForm();
    toast.success("User Self Exclude Updated Successfully");
  };

  // submit Form
  const handleSubmit = async (values) => {
    const { data, error } = await fetchData(
      "/player/selfExclusion",
      "POST",
      values
    );

    if (data && data.success) {
      handlePassChange(data);
      logout();
      window.location.href = `/${locale}/`;
    } else if (error) {
      // console.error("API Request Error:", error);
      toast.error(error.message);
    }
  };

  // formik
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Card>
          <H4 name={t("SelfExclusion")} />
          {/* <div className="grid tab:grid-cols-3 gap-2 tab:gap-5 mt-5">
            <div className="">
              <P name={t("From")} className="mb-2 !text-white" />
              <UIInput
                type="date"
                name="self_exclusion_from"
                value={formik.values.self_exclusion_from}
                onChange={formik.handleChange}
              />
            </div>
            <div className="">
              <P name={t("To")} className="mb-2 !text-white" />
              <UIInput
                type="date"
                name="self_exclusion_to"
                value={formik.values.self_exclusion_to}
                onChange={formik.handleChange}
              />
            </div>
          </div> */}

          <div className="mt-5 tab:w-[30%]">
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
              className="rounded-lg"
            />
          </div>

          {/* Submit button */}
          <SubmitButton
            name={t("Submit")}
            isLoading={isLoading}
            className="!w-auto"
          />
        </Card>
      </form>
    </>
  );
}
