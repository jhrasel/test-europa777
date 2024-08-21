"use client";
import SubmitButton from "@/helpers/SubmitButton";
import useApi from "@/helpers/apiRequest";
import useCookies from "@/helpers/useCookies";
import { loginValidation } from "@/validations/Valodation";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { ErrorMessage, P, UIInput } from "../UI";

export const ForgetForm = () => {
  const { fetchData, isLoading } = useApi();
  const { setCookies } = useCookies();
  const t = useTranslations("Common");

  const initialValues = {
    email: "",
  };

  // Handle success after password reset request
  const handleLoginSuccess = (responseData) => {
    formik.resetForm();
    toast.success("Password has been sent to your email.");
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    const { data, error } = await fetchData("/forgot-password", "POST", values);

    if (data) {
      handleLoginSuccess(data);
    } else if (error) {
      toast.error(error.message);
    }
  };

  // Setup Formik for form management
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginValidation,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <P name={t("Email Address")} className="mb-2" />
        <UIInput
          type="email"
          name="email"
          placeholder={t("Email")}
          onChange={formik.handleChange}
          value={formik.values.email}
          className={
            formik.errors.email
              ? "rounded-lg border-2 border-red-600"
              : "rounded-lg"
          }
        />
        {/* Display form validation errors */}
        {formik.errors.email && (
          <ErrorMessage errorName={formik.errors.email} />
        )}
      </div>
      {/* Submit button with loading state */}
      <SubmitButton name="Send Password Reset Link" isLoading={isLoading} />
    </form>
  );
};
