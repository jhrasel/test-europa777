"use client";

import { H2, P, UIButton, UIInput } from "@/components/UI";
import useApi from "@/helpers/apiRequest";
import { Modal } from "antd";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";
import { ClockLoader } from "react-spinners";

export const ProfileUpdateModal = ({ openModal, handleModal }) => {
  const { fetchData, error, isLoading } = useApi();

  const [loading, setLoading] = useState(false);
  const t = useTranslations("playerProfilePage");

  const initialValues = {
    first_name: "",
    last_name: "",
    street_address_1: "",
    city: "",
    zip: "",
    gender: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);

    const { data, error } = await fetchData(
      "/player/updateProfile",
      "POST",
      values
    );

    if (data && data.success) {
      // console.log("free spin", data);
      handleModal(false);
      resetForm();
    } else if (error) {
      // console.error("API Request Error:", error);
      setLoading(false);
      toast.error(error.message);
    }
  };

  // Formik configuration
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <Modal
        open={openModal}
        centered
        onCancel={() => handleModal(false)}
        className="!w-[90%] tab:!w-[600px]"
        footer={null}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="bg-[#2B2740] rounded-md p-5 shadow-md mb-5">
            <div className="flex flex-col justify-center my-5">
              <H2 name="Complete your Profile" className="text-center" />
              <P name="Before make deposit" className="text-center" />
            </div>
            <div className="grid tab:grid-cols-2 gap-2 tab:gap-5">
              {/* first name */}
              <div className="">
                <P name={t("FirstName")} className="mb-2 !text-white" />
                <UIInput
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                />
              </div>

              {/* last name */}
              <div className="">
                <P name={t("LastName")} className="mb-2 !text-white" />
                <UIInput
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                />
              </div>

              {/* gender */}
              <div className="">
                <P name={t("Gender")} className="mb-2 !text-white" />
                <select
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  className="w-full p-2 rounded-md"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>

              {/* address */}
              <div className="">
                <P name={t("Address")} className="mb-2 !text-white" />
                <UIInput
                  type="text"
                  name="street_address_1"
                  placeholder="Address 1"
                  value={formik.values.street_address_1}
                  onChange={formik.handleChange}
                />
              </div>

              {/* City */}
              <div className="">
                <P name={t("City")} className="mb-2 !text-white" />
                <UIInput
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                />
              </div>

              {/* Zip */}
              <div className="">
                <P name={t("Postcode")} className="mb-2 !text-white" />
                <UIInput
                  type="text"
                  name="zip"
                  placeholder="Postcode"
                  value={formik.values.zip}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            {/* Submit button */}
            {loading ? (
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
                disable
                className={`!bg-blue-color mt-3`}
                // {...props}
              />
            ) : (
              <UIButton
                htmlType="submit"
                name={t("update")}
                className={`!bg-blue-color mt-3`}
                // {...props}
              />
            )}
          </div>
        </form>
      </Modal>
    </div>
  );
};
