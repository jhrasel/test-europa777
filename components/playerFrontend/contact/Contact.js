"use client";
import { Container, ErrorMessage, H2, P, UIInput } from "@/components/UI";
import SubmitButton from "@/helpers/SubmitButton";
import useApi from "@/helpers/apiRequest";
import { ContactValidation } from "@/validations/Valodation";
import { Select } from "antd";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const { fetchData, error, isLoading } = useApi();
  const [recaptchaValue, setRecaptchaValue] = useState("");
  const [recaptchaError, setRecaptchaError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const t = useTranslations("contactUsPage");

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
    formik.setFieldValue("phone", value);
  };

  const handleCurrencyChange = (selectedCurrency) => {
    setSelectedCurrency(selectedCurrency);
    formik.setFieldValue("department", selectedCurrency);
  };

  const currencyOptions = [
    { value: "deposit", label: "Deposit" },
    { value: "withdraw", label: "Withdraw" },
    { value: "kyc", label: "Kyc" },
    { value: "technical", label: "Technical" },
    { value: "other", label: "Other" },
  ];

  // Form Submitting
  const initialValues = {
    name: "",
    phone: "",
    email: "",
    message: "",
    department: "",
  };

  // handleLoginSuccess
  const handleFormSuccess = (responseData) => {
    formik.resetForm();
    toast.success("Thank you for contacting us");
  };

  // submit Form
  const handleSubmit = async (values) => {
    try {
      if (!recaptchaValue) {
        setRecaptchaError(true); // Set CAPTCHA error to true
        toast.error("Please complete the CAPTCHA.");
        return;
      }

      // Reset CAPTCHA error if CAPTCHA is completed
      setRecaptchaError(false);

      console.log("Submitting values:", values);

      const { data, error } = await fetchData("/contactUs", "POST", {
        ...values,
        recaptchaValue: recaptchaValue,
      });

      if (data) {
        handleFormSuccess(data);
        toast.success("Your message has been sent successfully!");
      } else if (error) {
        console.error("API Request Error:", error);
        toast.error(
          error.message || "Failed to send your message. Please try again."
        );
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  // formik
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ContactValidation,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <section>
        <Container>
          <H2
            name={t("Contact Us")}
            className="text-center py-5 bg-bg-color2"
          />

          <form onSubmit={formik.handleSubmit}>
            <div className="mt-8 flex flex-wrap items-start gap-5 desktop:gap-8">
              {/*	item*/}
              <div className="w-full tab:w-[48%]">
                <P name={t("Name")} className="mb-2" />
                <UIInput
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  placeholder="Enter Name"
                  className={
                    formik.errors.name
                      ? "rounded-lg border-2 border-red-600"
                      : "rounded-lg"
                  }
                />
                {/* error */}
                {formik.errors.name && (
                  <ErrorMessage errorName={formik.errors.name} />
                )}
              </div>
              {/*	item*/}
              <div className="w-full tab:w-[48%]">
                <P name={t("Email")} className="mb-2" />
                <UIInput
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  placeholder="Enter Email"
                  className={
                    formik.errors.email
                      ? "rounded-lg border-2 border-red-600"
                      : "rounded-lg"
                  }
                />
                {/* error */}
                {formik.errors.email && (
                  <ErrorMessage errorName={formik.errors.email} />
                )}
              </div>
              {/*	item*/}
              <div className="w-full tab:w-[48%]">
                <P name={t("Phone")} className="mb-2" />
                <PhoneInput
                  id="phone"
                  placeholder="Enter phone number"
                  defaultCountry="US"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className="w-full px-2.5 py-1.5 text-md text-gray-800 bg-[#E5EAF0] rounded-lg placeholder:text-sm tab:placeholder:text-xs"
                />
                {/* error */}
                {formik.errors.phone && (
                  <ErrorMessage errorName={formik.errors.phone} />
                )}
              </div>
              {/*	item*/}
              <div className="w-full tab:w-[48%]">
                <P name={t("Issue Related to")} className="mb-2" />
                <Select
                  showSearch
                  placeholder="Issue Related to"
                  value={selectedCurrency}
                  onChange={(selectedCurrency) => {
                    setSelectedCurrency(selectedCurrency);
                    handleCurrencyChange(selectedCurrency);
                  }}
                  style={{ width: "100%" }}
                  options={currencyOptions}
                />
              </div>
              {/*	item*/}
              <div className="w-full tab:w-[100%]">
                <P name={t("Message")} className="mb-2" />
                <textarea
                  name="message"
                  onChange={formik.handleChange}
                  value={formik.values.message}
                  rows="5"
                  className="w-full px-2.5 py-1.5 text-md text-gray-800 bg-[#E5EAF0] rounded-lg placeholder:text-sm tab:placeholder:text-xs"
                ></textarea>
              </div>

              <div className="w-full">
                <ReCAPTCHA
                  sitekey="6LdYaWcpAAAAAEPCH8Bfn5z_9SjTkvCh7Np3NuDB" 
                  onChange={handleRecaptchaChange}
                />
                {recaptchaError && (
                  <div className="text-red-600">
                    Please complete the CAPTCHA verification.
                  </div>
                )}
              </div>

              {/* submit Button */}
              <SubmitButton name={t("Send Message")} isLoading={isLoading} />
            </div>
          </form>
        </Container>
      </section>
    </>
  );
};
