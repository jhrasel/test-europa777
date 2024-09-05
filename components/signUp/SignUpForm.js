"use client";

import useApi from "@/helpers/apiRequest";
import { useFingerPrint } from "@/hook/useFingerPrint";
import { registrationValidation } from "@/validations/Valodation";
import { Checkbox, Select } from "antd";
import countryList from "country-list";
import { useFormik } from "formik";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { ClockLoader } from "react-spinners";
import { ErrorMessage, P, UIButton, UIInput, UILink } from "../UI";

// Ant Select
const onChange = (e) => {
  //(`checked = ${e.target.checked}`);
};

// Get the list of countries
const countries = countryList.getData();

// main part
export const SignUpForm = ({
  onSignUpSuccess,
  defaultCountry,
  selectedBonus,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedCountry, setSelectedCountry] = useState(defaultCountry.name);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const { fetchData, error, isLoading } = useApi();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState("");
  const [recaptchaError, setRecaptchaError] = useState(false);
  const [defaultPhoneCountry, setDefaultPhoneCountry] = useState(
    defaultCountry.code
  );

  const fingerprint = useFingerPrint();

  const t = useTranslations("Common");
  const locale = useLocale();

  const handleCountryChange = (selectedCountry) => {
    setSelectedCountry(selectedCountry);
    setDefaultPhoneCountry(getDefaultPhoneCountry(selectedCountry));
    formik.setFieldValue("country", selectedCountry);
  };

  const getDefaultPhoneCountry = (selectedCountry) => {
    const iso2Code = countryList.getCode(selectedCountry);

    if (iso2Code) {
      return iso2Code;
    }

    return "US";
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
    formik.setFieldValue("phone", value);
  };

  const handleCurrencyChange = (selectedCurrency) => {
    setSelectedCurrency(selectedCurrency);
    formik.setFieldValue("currency", selectedCurrency);
  };

  const currencyOptions = [
    { value: "CAD", label: "CAD" },
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
    { value: "GBP", label: "GBP" },
  ];

  const countryOptions = countries.map((country) => ({
    value: country.name,
    label: country.name,
  }));

  const initialValues = {
    email: "",
    country: defaultCountry.name,
    phone: "",
    password: "",
    currency: "USD",
    // promotion: "",
  };

  const handleSignUpSuccess = (responseData) => {
    formik.resetForm();
    toast.success(
      "Registration Successful! Please Check Your Email For Verification."
    );
    router.push(
      pathname +
        `?modal=sign-in&resend-email=open&email=${responseData.user.email}`
    );
  };

  const handleSubmit = async (values) => {
    try {
      if (!recaptchaValue) {
        setRecaptchaError(true);
        toast.error("Please complete the CAPTCHA to continue.");
        return;
      }

      setRecaptchaError(false);

      const { data, error } = await fetchData("/register", "POST", {
        ...values,
        recaptchaValue: recaptchaValue,
        fingerprint: fingerprint,
        promotion: selectedBonus,
      });

      if (data) {
        onSignUpSuccess();
        handleSignUpSuccess(data);
      } else if (error) {
        toast.error(error.message || "Registration failed. Please try again.");
      }
    } catch (err) {}
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: registrationValidation,
    onSubmit: handleSubmit,
  });

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const showSignInModal = () => {
    router.push(pathname + "?" + createQueryString("modal", "sign-in"));
  };

  // Synchronize Formik value with the component state on mount
  useEffect(() => {
    formik.setFieldValue("country", selectedCountry);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-1 mb-1">
        <a href={`${process.env.NEXT_PUBLIC_API_URL}/api/login/google`}>
          <img
            className="cursor-pointer"
            src="https://developers.google.com/static/identity/images/branding_guideline_sample_lt_rd_lg.svg"
          />
        </a>
        <P name="OR" cla />
        {/* <span className="mt-2 font-semibold">Or</span> */}
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="registration flex flex-col gap-2"
      >
        {/* email */}
        <div className="">
          <UIInput
            type="email"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className={
              formik.touched.email && formik.errors.email
                ? "rounded-lg !py-5 border border-red-600"
                : "rounded-lg !py-5"
            }
          />
          {/* error */}
          {formik.touched.email && formik.errors.email && (
            <ErrorMessage errorName={formik.errors.email} />
          )}
        </div>

        {/* Password */}
        <div className="">
          <UIInput
            type="password"
            name="password"
            placeholder={t("Password")}
            onChange={formik.handleChange}
            value={formik.values.password}
            className={
              formik.touched.password && formik.errors.password
                ? "rounded-lg !py-5 border border-red-600"
                : "rounded-lg !py-5"
            }
          />
          {/* error */}
          {formik.touched.password && formik.errors.password && (
            <ErrorMessage errorName={formik.errors.password} />
          )}
        </div>
        {/* Country */}
        <div className="bg-[#f2f8ff] border border-[#d9d9d9] px-4 py-2 rounded-lg">
          <label htmlFor="Country" className="block text-xs">
            {t("Country")}
          </label>

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
            className="!bg-[#f2f8ff]"
          />
          {formik.touched.country && formik.errors.country && (
            <ErrorMessage
              errorName={formik.errors.country}
              className="!text-sm"
            />
          )}
        </div>

        {/* phone */}
        <div className="relative">
          {/* overlay */}
          <div className="absolute left-0 top-0 bg-red-300 w-14 h-full z-10 rounded-lg opacity-0"></div>
          <PhoneInput
            id="phone"
            placeholder="Enter phone number"
            international
            countryCallingCodeEditable={false}
            defaultCountry={defaultPhoneCountry}
            value={`${phoneNumber}`}
            onChange={handlePhoneChange}
            className="w-full text-md text-gray-800 !bg-[#f2f8ff] border border-[#d9d9d9] py-5 px-4 rounded-lg placeholder:text-sm tab:placeholder:text-xs"
          />
          {/* error */}
          {formik.touched.phone && formik.errors.phone && (
            <div className="text-xs text-red-600">{formik.errors.phone}</div>
          )}
        </div>
        {/* Currency */}
        <div className="bg-[#f2f8ff] border border-[#d9d9d9] px-4 py-2 rounded-lg">
          <label htmlFor="Currency" className="text-xs block">
            {t("Currency")}
          </label>
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
            className="!bg-[#f2f8ff] text-xs"
          />
          {/* error */}
          {formik.touched.currency && formik.errors.currency && (
            <ErrorMessage
              errorName={formik.errors.currency}
              className="!text-xs"
            />
          )}
        </div>

        <div className="flex items-center gap-0.5">
          <Checkbox onChange={onChange} checked className="">
            <label htmlFor="Promo Code" className="mb-0.5 text-xs">
              {t("I agree with")}
              <UILink
                href={`/${locale}/terms-condition`}
                name={t("Privacy Policy")}
                className="!text-blue-600 font-medium !text-xs"
              />
              <span className="inline-block px-1"> {t("and")}</span>
              <UILink
                href={`/${locale}/terms-condition`}
                name={t("terms & conditions")}
                className="!text-blue-600 font-medium !text-xs pl-1"
              />
            </label>
          </Checkbox>
        </div>

        {/* <div className="flex items-center mb-1 text-sm">
          <Checkbox onChange={onChange} checked>
            {t("I want to receive promo offers and bonuses")}
          </Checkbox>
        </div> */}

        {/* capcha */}
        <div className="">
          <ReCAPTCHA
            sitekey="6LdYaWcpAAAAAEPCH8Bfn5z_9SjTkvCh7Np3NuDB" // Replace with your reCAPTCHA Site Key
            onChange={handleRecaptchaChange}
          />
          {recaptchaError && (
            <div className="text-blue-600">
              Please complete the CAPTCHA verification.
            </div>
          )}
        </div>

        {/* submit Button */}
        <div className="mt-2 flex items-center justify-between">
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
              className={`w-full !bg-blue-color`}
            />
          ) : (
            <UIButton
              htmlType="submit"
              name={t("Sign Up")}
              className={`w-full !bg-blue-color`}
            />
          )}
        </div>
      </form>
      <div onClick={showSignInModal} className="flex justify-center mt-1">
        <h3 className="cursor-pointer text-text-color-primary flex items-center gap-2 !text-sm">
          Already have an account?
          <span className="text-blue-color hover:text-blue-800">
            {t("Sign In")}
          </span>
        </h3>
      </div>
    </>
  );
};
