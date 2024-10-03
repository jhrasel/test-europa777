"use client";
import { H3, H4, H5, P, UIImage, UIInput } from "@/components/UI";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import SubmitButton from "@/helpers/SubmitButton";
import useApi from "@/helpers/apiRequest";
import useBalance from "@/hook/useBalance";
import { CopyOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import QRCode from "qrcode.react";
import { useState } from "react";
import toast from "react-hot-toast";
import HavePromoCode from "./HavePromocode";
import PromoCodeInput from "./PromoCodeInput";

export const LightCoin = () => {
  const [depositAmount, setDepositAmount] = useState(25);
  const { fetchData, isLoading } = useApi();
  const [showModalData, setShowModalData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const promoCodeT = useTranslations("promoCode");

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

  const showToastSuccess = (message) => {
    toast.success(message);
  };

  const showToastError = (message) => {
    toast.error(message);
  };

  const handleResponse = (responseData) => {
    formik.resetForm();
    if (responseData?.success) {
      showToastSuccess(responseData.message);
      if (responseData?.data?.currency_rate?.rate_to_currency === "LTC") {
        showModal();
      } else {
        showToastSuccess(responseData.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } else {
      showToastError(responseData.message);
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
      setShowModalData(data.data);
      handleResponse(data);
    } else if (error) {
      toast.error(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      deposit_amount: "",
      gateway: "crypto",
      crypto_currency: "LTC",
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
            src="/images/bank-img/ltc.png"
            alt="deposit"
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
            <div className="flex flex-wrap items-center gap-1">
              {[25, 50, 100, 200, 500].map((amount) => (
                <div
                  key={amount}
                  onClick={() => handleButtonClick(amount)}
                  className="link__bg py-1.5 px-2 tab:px-5 rounded-full cursor-pointer text-white text-[10px] tab:text-base font-semibold"
                >
                  {`${amount} ${balance.currency}`}
                </div>
              ))}
            </div>

            {/* deposit */}
            <div className="mt-5">
              <div className="flex flex-col items-center gap-5">
                {/* Deposit */}
                <div className="w-[100%] m-auto">
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

                <PromoCodeInput
                  fetchData={fetchData}
                  isLoading={isLoading}
                  className="!w-full"
                />
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
      {/* modal */}
      <Modal
        open={isModalOpen}
        centered
        onCancel={handleCancel}
        className="!w-[90%] tab:!w-[550px]"
        footer={null}
      >
        <div className="p-5 bg-bg-color2 rounded-lg">
          <H4 name="Crypto Details" className="text-center mb-3" />
          <H3
            name={`${showModalData?.currency_rate?.rate_to} ${showModalData?.currency_rate?.rate_to_currency}`}
            className="!text-red-color text-center capitalize"
          />
          <P
            name="This is your private depositing address. Any transactions you make to this address will show in your balance after 1 confirmation. Kindly note the minimum deposit limit stated, as deposits below this limit cannot be processed"
            className="text-center mt-2"
          />
          {/* pay */}
          <div className="mt-5">
            <div className="flex items-center gap-5">
              <H5 name="Amount to Pay :" />
              <H5
                name={`${showModalData?.currency_rate?.rate_to} ${showModalData?.currency_rate?.rate_to_currency}`}
                className=" uppercase"
              />
            </div>
            <div className="tab:flex items-start gap-5 mt-5">
              <H5 name="Pay Address :" />
              <div className="mt-4">
                <QRCode
                  value={showModalData?.address}
                  size={150}
                  className="!w-28 !h-28 rounded-md"
                />
                {/* <UIImage
                  src="https://chart.googleapis.com/chart?chs=150x150&amp;cht=qr&amp;chl="
                  className="!w-28 !h-28 rounded-md"
                /> */}
                <div className="flex gap-2 mt-2">
                  <P name={showModalData?.address} />
                  <button
                    className="text-red-color focus:outline-none"
                    onClick={() => {
                      navigator.clipboard.writeText(showModalData?.address);
                      toast.success("Pay address copied to clipboard");
                    }}
                  >
                    <CopyOutlined />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
