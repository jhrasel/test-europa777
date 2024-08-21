"use client";
import { Card, P, UIInput } from "@/components/UI"; // Import UIButton for the submit button
import SubmitButton from "@/helpers/SubmitButton";
import useApi from "@/helpers/apiRequest";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast"; // Import toast for displaying notifications

export const UpdatePassword = () => {
  const [userData, setUserData] = useState("");
  const { fetchData, error, isLoading } = useApi();
  const t = useTranslations("playerProfilePage");

  const initialValues = {
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  };

  // handlePassChange
  const handlePassChange = (responseData) => {
    formik.resetForm();
  };

  // submit Form
  const handleSubmit = async (values) => {
    const { data, error } = await fetchData(
      "/player/updatePassword",
      "POST",
      values
    );

    if (data && data.success) {
      handlePassChange(data);
      toast.success(data.message);
    } else if (error) {
      // console.error("API Request Error:", error);
      toast.error(
        error.message || "Failed to update password. Please try again."
      );
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
          <div className="grid tab:grid-cols-3 gap-2 tab:gap-5">
            {/* old password */}
            <div className="">
              <P name={t("OldPassword")} className="mb-2 !text-white" />
              <UIInput
                type="password"
                name="old_password"
                placeholder="Old Password"
                value={formik.values.old_password}
                onChange={formik.handleChange}
              />
            </div>
            {/* new password */}
            <div className="">
              <P name={t("NewPassword")} className="mb-2 !text-white" />
              <UIInput
                type="password"
                name="new_password"
                placeholder="New Password"
                value={formik.values.new_password}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          {/* Submit button */}
          <SubmitButton
            name={t("update")}
            isLoading={isLoading}
            className="!w-auto"
          />
        </Card>
      </form>
    </>
  );
};
