"use client";
import { Card, P, UIButton, UIInput } from "@/components/UI";
import useApi from "@/helpers/apiRequest";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ClockLoader } from "react-spinners";

export const UserInfo = () => {
  const { fetchData, error, isLoading, setIsLoading } = useApi();
  const [userData, setUserData] = useState("");

  // const [loading, setLoading] = useState(false);
  const t = useTranslations("playerProfilePage");

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "",
    street_address_1: "",
    city: "",
    zip: "",
    gender: "",
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await fetchData("/player/getProfile", "GET");

      if (data) {
        formik.setValues({
          first_name: data.Player.first_name,
          last_name: data.Player.last_name,
          email: data.Player.email,
          phone: data.Player.phone,
          country: data.Player.country,
          street_address_1: data.Player.street_address_1,
          city: data.Player.city,
          zip: data.Player.zip,
          gender: data.Player.gender,
        });
        setUserData(data.Player);
        // toast.success(data.message);
        // console.log("data messgae", data);
        setIsLoading(false);
      } else if (error) {
        // console.error("Error fetching user data:", error);
        toast.error(
          error.message || "An error occurred while fetching user data."
        );
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    const { data, error } = await fetchData(
      "/player/updateProfile",
      "POST",
      values
    );

    if (data && data.success) {
      // handlePassChange(data);
      toast.success(data.message);
    } else if (error) {
      toast.error(
        error.message || "Failed to update profile. Please try again."
      );
    }
  };

  // Formik configuration
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Card>
          <div className="grid tab:grid-cols-3 gap-2 tab:gap-5">
            {/* name */}
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

            {/* name */}
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

            {/* email */}
            <div className="">
              <P name={t("Email")} className="mb-2 !text-white" />
              <UIInput
                type="text"
                name="email"
                placeholder="Email"
                value={formik.values.email}
              />
            </div>
            {/* username */}
            {/* <div className="">
              <P name="User Name" className="mb-2 !text-white" />
              <UIInput
                type="text"
                name="username"
                placeholder="User Name"
                value={userData.username}
              />
            </div> */}
            {/* phone */}
            <div className="">
              <P name={t("Phone")} className="mb-2 !text-white" />
              <UIInput
                type="text"
                name="phone"
                placeholder="Phone"
                value={formik.values.phone}
                // onChange={formik.handleChange}
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
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* country */}
            <div className="">
              <P name={t("Country")} className="mb-2 !text-white" />
              <UIInput
                type="text"
                name="country"
                placeholder="Country"
                value={formik.values.country}
                // onChange={formik.handleChange}
              />
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
        </Card>
      </form>
    </>
  );
};
