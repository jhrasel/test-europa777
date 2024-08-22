"use client";
import { ErrorMessage, H6, P, UIImage, UIInput } from "@/components/UI";
import SubmitButton from "@/helpers/SubmitButton";
import useApi from "@/helpers/apiRequest";
import { ineracWithdrawValidation } from "@/validations/Valodation";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import ShowBalance from "./ShowBalance";

export const Inerac = () => {
  const { fetchData, error, isLoading } = useApi();

  const initialValues = {
    amount: "",
    email: "",
    phone: "",
    gateway: "interkassa",
    payment_method: "Interac",
  };

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

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ineracWithdrawValidation,
    onSubmit: handleSubmit,
  });

  return (
    <div className="bg-white p-2 tab:p-5 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center gap-2">
          <UIImage
            src="/images/bank-img/interac.png"
            className="!w-16 tab:!w-32 !h-auto object-cover"
          />
          <H6
            name="Min 50.00"
            className="!text-blue-color font-bold !text-sm tab:!text-lg -mt-1.5"
          />
        </div>
        <ShowBalance />
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="border-t border-indigo-300 pt-3 mt-3">
          <div className="mt-5">
            <div className="tab:flex items-center gap-5">
              {/* Withdraw Amount */}
              <div className="mb-5 tab:w-[30%]">
                <P name="Withdraw amount (CAD):" className="mb-2" />
                <UIInput
                  type="number"
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
                {formik.errors.amount && (
                  <ErrorMessage errorName={formik.errors.amount} />
                )}
              </div>
              {/* Email Address */}
              <div className="mb-5 tab:w-[30%]">
                <P name="Email Address:" className="mb-2" />
                <UIInput
                  type="text"
                  placeholder="Email Address"
                  name="email"
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
              {/* Phone Number */}
              <div className="mb-5 tab:w-[30%]">
                <P name="Phone Number:" className="mb-2" />
                <UIInput
                  type="text"
                  placeholder="Phone Number"
                  name="phone"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  className={
                    formik.errors.phone
                      ? "rounded-lg border-2 border-red-600"
                      : "rounded-lg"
                  }
                />
                {formik.errors.phone && (
                  <ErrorMessage errorName={formik.errors.phone} />
                )}
              </div>
            </div>
            <SubmitButton
              name="Withdraw"
              isLoading={isLoading}
              className="!w-auto"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
