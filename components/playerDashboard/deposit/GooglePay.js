"use client";
import { H4, P, UIImage, UIInput } from "@/components/UI";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import SubmitButton from "@/helpers/SubmitButton";
import useApi from "@/helpers/apiRequest";
import useBalance from "@/hook/useBalance";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import PromoCodeInput from "./PromoCodeInput";

export const GooglePay = ({ country }) => {
  const [depositAmount, setDepositAmount] = useState(25);
  const { fetchData, isLoading } = useApi();
  const [showModalData, setShowModalData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLoginSuccess = () => {
    setIsModalOpen(false);
  };

  const handleButtonClick = (amount) => {
    setDepositAmount(amount);
  };

  const handleInputChange = (e) => {
    setDepositAmount(e.target.value);
  };

  const handleResponse = (responseData) => {
    formik.resetForm();
    if (responseData?.success) {
      toast.success(responseData.message);
      if (responseData?.redirectUrl) {
        window.location.href = responseData.redirectUrl;
      }
    } else {
      toast.error(responseData.message);
    }
  };

  const handleSubmit = async (values) => {
    values.deposit_amount = depositAmount.toString();

    const { data, error } = await fetchData(
      "/player/makeDeposit",
      "POST",
      values
    );

    if (data) {
      handleResponse(data);
    } else if (error) {
      toast.error(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      deposit_amount: "",
      gateway: "interkassa",
      crypto_currency: "gpay",
    },
    onSubmit: handleSubmit,
  });

  const balance = useBalance();

  if (balance === null) {
    return <CustomSkeleton hasImage={false} hasText={true} />;
  }

  return (
    <>
      <div className="bg-white p-2 tab:p-5 rounded-lg">
        <div className="flex items-center gap-2">
          <UIImage
            src="/images/bank-img/g-pay.png"
            className="!w-16 tab:!w-32 !h-auto object-cover"
          />
          <H4
            name={`Min: 10 ${balance.currency}`}
            className="!text-red-color"
          />
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="border-t border-indigo-300 pt-3 mt-3">
            <H4 name="" className="mt-3 !text-indigo-600" />
            <div
              className="flex flex-wrap items-center 
gap-1 tab:gap-3"
            >
              {[25, 50, 100, 200, 500].map((amount) => (
                <div
                  key={amount}
                  onClick={() => handleButtonClick(amount)}
                  className="link__bg py-2 px-2 tab:px-8 rounded-full cursor-pointer text-white text-[11px] tab:text-lg font-semibold"
                >
                  {`${amount} ${balance.currency}`}
                </div>
              ))}
            </div>
            {/* deposit */}
            <div className="mt-5">
              <div className="flex flex-col items-center gap-5">
                {/* Deposit */}
                <div className="w-[100%] laptop:w-[50%] desktop:w-[40%] m-auto">
                  <P
                    name={`Deposit Amount ${balance.currency}:`}
                    className="mb-2"
                  />
                  <UIInput
                    type="text"
                    name="deposit_amount"
                    placeholder="Deposit Amount"
                    value={depositAmount}
                    onChange={handleInputChange}
                  />
                </div>
                {/* promo Code */}
                <PromoCodeInput fetchData={fetchData} isLoading={isLoading} />
              </div>
              {/* SubmitButton */}
              <SubmitButton
                name="Deposit"
                isLoading={isLoading}
                className="!w-auto m-auto"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
