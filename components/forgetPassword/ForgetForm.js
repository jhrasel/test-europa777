// ForgetForm.js
"use client";
import SubmitButton from "@/helpers/SubmitButton";
import useApi from "@/helpers/apiRequest";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { ErrorMessage, P, UIInput } from "../UI";
import { useState } from "react";
import OtpModal from "./OtpModal"; 

export const ForgetForm = () => {
  const { fetchData, isLoading } = useApi();
  const t = useTranslations("Common");
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [email, setEmail] = useState(""); 

  const initialValues = {
    email: "",
  };

  // Handle success after password reset request
  const handleLoginSuccess = (responseData, email) => {
    formik.resetForm();
    setEmail(email);
    toast.success("Password reset link has been sent to your email.");
    setIsOtpModalOpen(true); 
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    const { data, error } = await fetchData(
      `/forgotPassword/${values.email}`,
      "POST"
    );

    if (data) {
      handleLoginSuccess(data, values.email);
    } else if (error) {
      toast.error(error.message);
    }
  };

  // Setup Formik for form management
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <P name={t("Email Address")} className="mb-2" />
          <UIInput
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className={
              formik.errors.email
                ? "rounded-lg border-2 border-red-600"
                : "rounded-lg"
            }
          />
          {formik.errors.email && (
            <ErrorMessage errorName={formik.errors.email} />
          )}
        </div>
        <SubmitButton name="Send Password Reset Link" isLoading={isLoading} />
      </form>

      {/* OTP Modal */}
      <OtpModal
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        email={email}
      />
    </>
  );
};
