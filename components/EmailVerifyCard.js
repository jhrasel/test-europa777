"use client";

import { H4, H5, P } from "@/components/UI";
import useApi from "@/helpers/apiRequest";
import { Modal } from "antd";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineMail } from "react-icons/hi";
import { IoIosArrowRoundForward } from "react-icons/io";
import { ClockLoader } from "react-spinners";

export const EmailVerifyCard = ({ setIsModalOpen, email = "" }) => {
  const [isClient, setIsClient] = useState(false);

  const { fetchData, isLoading } = useApi();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Formik hook setup
  const formik = useFormik({
    initialValues: { email },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const { data, error } = await fetchData("/email/resend", "POST", values);
      if (data) {
        toast.success(
          "Verification e-mail Re-send Successfully, Please Check your mail inbox"
        );
      } else if (error) {
        toast.error("An unexpected error occurred. Please try again.");
      }
    },
  });

  const reloadSite = () => {
    setIsModalOpen(false);
  };

  return (
    isClient && (
      <Modal
        open={true}
        centered
        onCancel={() => setIsModalOpen(false)}
        className="!w-[90%] tab:!w-[600px]"
        footer={null}
      >
        <div className="p-5 tab:p-10 text-center flex flex-col gap-2">
          <div className="w-20 h-20 rounded-full bg-blue-color text-white flex items-center justify-center m-auto text-5xl">
            <HiOutlineMail />
          </div>

          <H4 name="Verify your email address" className="text-bg-color2" />

          <div className="flex flex-col tab:flex-row items-center gap-1 justify-center">
            <H5 name={`We sent a verification link to`} />
            <H5 name={email} className="!font-semibold !text-blue-color" />
          </div>
          <H5 name="It may take up to 2 minutes to receive the email" />
          <P name="You might be check your spam folder" />

          <H5 name="If you did not receive the email" />

          <form onSubmit={formik.handleSubmit}>
            <div className="hidden">
              <input type="hidden" name="id" value={formik.values.id} />
            </div>

            <div className="flex items-center justify-center w-full gap-5 mt-3">
              {isLoading ? (
                <button
                  type="submit"
                  disabled
                  isLoading={isLoading}
                  className="text-text-color-primary cursor-pointer hover:text-blue-color underline text-base"
                >
                  <ClockLoader
                    className="text-heading-0"
                    color="#0055FF"
                    size={30}
                    margin={0}
                  />
                </button>
              ) : (
                <button
                  type="submit"
                  isLoading={isLoading}
                  onClick={() => setIsModalOpen(true)}
                  className="text-text-color-primary cursor-pointer hover:text-blue-color underline text-base"
                >
                  Resend Email
                </button>
              )}

              <button
                onClick={reloadSite}
                href="/"
                className="font-normal text-blue-color flex items-center gap-1 tab:gap-2 text-base tab:text-lg"
              >
                Return to site
                <IoIosArrowRoundForward className="text-xl tab:text-4xl" />
              </button>
            </div>
          </form>
        </div>
      </Modal>
    )
  );
};
