"use client";
import { EmailVerifyCard } from "@/components/EmailVerifyCard";
import SubmitButton from "@/helpers/SubmitButton";
import useApi from "@/helpers/apiRequest";
import useCookies from "@/helpers/useCookies";
import { loginValidation } from "@/validations/Valodation";
import { useFormik } from "formik";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ErrorMessage, P, UIInput, UILink } from "../UI";

export const SignInForm = ({ onLoginSuccess }) => {
  const [isResendOpen, setIsResendOpen] = useState(false);
  const [emailAddress, setEmailAddress] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { fetchData, isLoading } = useApi();
  const { setCookies } = useCookies();

  const t = useTranslations("Common");
  const locale = useLocale();

  const resendCardOpen = searchParams.get("resend-email") || null;
  const resendEmail = searchParams.get("email") || null;
  useEffect(() => {
    if (resendCardOpen === "open") {
      setIsResendOpen(true);
      setEmailAddress(resendEmail);
    }
  }, []);

  const initialValues = {
    email: resendEmail || "",
    password: "",
  };

  // handleLoginSuccess
  const handleLoginSuccess = (responseData) => {
    formik.resetForm();
    toast.success("Login successful!");
    const user = responseData.user;

    setCookies("token", responseData.token);
    setCookies("isLoggedIn", true);
    setCookies("user", JSON.stringify(user));
    onLoginSuccess();
    window.location.href = `/${locale}/player-dashboard/deposit/`;
  };

  // submit Form
  const handleSubmit = async (values) => {
    const { data, error } = await fetchData("/login", "POST", values);
    if (data) {
      handleLoginSuccess(data);
    } else if (error) {
      if (error.status === 409) {
        router.push(pathname + `?modal=duplicate-user&email=${error.email}`);
      } else if (error.data) {
        setIsResendOpen(true);
        setEmailAddress(error.data?.email);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  // formik
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginValidation,
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

  const showSignUpModal = () => {
    router.push(pathname + "?" + createQueryString("modal", "sign-up"));
  };

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
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="">
          <P name={t("Email Address")} className="mb-1 !text-sm" />
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
          {/* error */}
          {formik.errors.email && (
            <ErrorMessage errorName={formik.errors.email} />
          )}
        </div>
        <div className="mt-2">
          <P name="Password" className="mb-1 !text-sm" />
          <UIInput
            type="password"
            name="password"
            placeholder="Type your password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className={
              formik.errors.password
                ? "rounded-lg border-2 border-blue-600"
                : "rounded-lg"
            }
          />
          {/* error */}
          {formik.errors.password && (
            <ErrorMessage errorName={formik.errors.password} />
          )}
        </div>
        <div className="mt-2 flex items-center justify-end">
          <UILink
            href={`/${locale}/forget-password`}
            name={t("Forgot Password?")}
            onClick={() => {
              props.onForgotPassword();
            }}
            className="!text-blue-600 !text-sm hover:underline"
          />
        </div>

        {/* SubmitButton */}
        <SubmitButton name={t("Sign In")} isLoading={isLoading} />
      </form>
      <div onClick={showSignUpModal} className="flex justify-center mt-2">
        <h2 className="cursor-pointer text-text-color-primary flex items-center gap-2">
          Don&apos;t have an account yet?
          <span className="text-blue-color hover:text-blue-800">
            {t("Sign Up")}
          </span>
        </h2>
      </div>
      <div className="flex justify-center mt-2">
        {/* <a href={`${process.env.NEXT_PUBLIC_API_URL}/api/login/google`}>
          <img
            className="cursor-pointer"
            src="https://developers.google.com/static/identity/images/branding_guideline_sample_lt_rd_lg.svg"
          />
        </a> */}
      </div>
      {isResendOpen && (
        <EmailVerifyCard
          email={emailAddress}
          setIsModalOpen={setIsResendOpen}
        />
      )}
    </>
  );
};
