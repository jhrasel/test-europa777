"use client";

import { Card, H4, P } from "@/components/UI";
import useApi from "@/helpers/apiRequest";
import { fetchBonusHistoryAPI } from "@/lib/fetchActiveBonusAPI";
import { Button, Empty, Modal, Pagination } from "antd";
import { useTranslations } from "next-intl";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiWarning } from "react-icons/ci";
import { FadeLoader } from "react-spinners";
import PromoCodeInput from "../deposit/PromoCodeInput";

export const BounsDB = () => {
  const [getData, setGetData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [isConvertModalVisible, setIsConvertModalVisible] = useState(false);
  const [selectedBonusId, setSelectedBonusId] = useState(null);
  const t = useTranslations("tableData");
  const { fetchData } = useApi();

  const pageSize = 10;

  const TableHead = [
    t("sl"),
    t("title"),
    t("bonus"),
    t("wagerRequired"),
    t("wagered"),
    t("currency"),
    t("status"),
    t("expireOn"),
  ];

  const tableTdStyle =
    "text-center border-b border-gray-50 p-3 text-sm font-normal text-white capitalize";

  const getFetchData = async (page = 1) => {
    setIsLoading(true);
    try {
      const data = await fetchBonusHistoryAPI(page);
      // console.log("data.bonusHistory.data", data.bonusHistory);
      setGetData(data.bonusHistory.data);
      setTotalPages(data.bonusHistory.last_page);
      setCurrentPage(data.bonusHistory.current_page);
    } catch (error) {
      console.error("API Request Error:", error);
      toast.error(
        error.message || "An error occurred while fetching bonus history."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBonus = async () => {
    const result = await fetchData("/player/cancelActiveBonus", "POST", {
      bonusId: selectedBonusId,
    });

    if (result.error) {
      toast.error(result.error.message);
    } else {
      toast.success("Bonus cancelled successfully.");
      getFetchData(currentPage);
    }

    setIsCancelModalVisible(false);
  };

  const handleConvertToCash = async () => {
    const result = await fetchData("/player/convertBonusToCash", "POST", {
      bonusId: selectedBonusId,
    });

    if (result.error) {
      toast.error(result.error.message);
    } else {
      toast.success("Bonus converted to cash successfully.");
      getFetchData(currentPage);
    }

    setIsConvertModalVisible(false);
  };

  const showCancelModal = (bonusId) => {
    setSelectedBonusId(bonusId);
    setIsCancelModalVisible(true);
  };

  const showConvertModal = (bonusId) => {
    setSelectedBonusId(bonusId);
    setIsConvertModalVisible(true);
  };

  const handleCancelModal = () => {
    setIsCancelModalVisible(false);
  };

  const handleConvertModal = () => {
    setIsConvertModalVisible(false);
  };

  useEffect(() => {
    getFetchData();
  }, []);

  let serialNumber = (currentPage - 1) * pageSize;

  return (
    <section>
      <Card className="overflow-x-auto">
        <PromoCodeInput className="!border-none m-auto" />
        <H4
          name={t("bonusHistory")}
          className="!text-indigo-500 text-center mb-5"
        />

        <Suspense
          fallback={
            <h3 className="flex items-center gap-2 my-4 text-white">
              <FadeLoader color="#FFF" />
            </h3>
          }
        >
          <table className="table-auto w-full relative">
            <thead>
              <tr className="bg-[#ececec]">
                {TableHead?.map((header, i) => (
                  <th
                    key={i}
                    className="first:text-left last:text-right first:rounded-tl-lg last:rounded-tr-lg p-3 text-base font-bold"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {getData.length > 0 ? (
                <>
                  {getData.map((data) => (
                    <tr key={data.id}>
                      <td className={`${tableTdStyle} first:text-left`}>
                        {++serialNumber}
                      </td>
                      <td className={`${tableTdStyle}`}>{data.title}</td>
                      <td className={`${tableTdStyle}`}>{data.amount}</td>
                      <td className={`${tableTdStyle}`}>{data.wager}</td>
                      <td className={`${tableTdStyle}`}>{data.wagered}</td>
                      <td className={`${tableTdStyle}`}>{data.currency}</td>
                      {/* <td className={`${tableTdStyle}`}>{data.status}</td> */}
                      <td className={`${tableTdStyle} md:text-center`}>
                        {data.status === 1 && (
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-white py-1.5 px-3 rounded inline-block w-full">
                              Active
                            </span>
                            <Button
                              onClick={() => showCancelModal(depositData.id)}
                              className="!bg-blue-color !text-white border !border-blue-color w-full"
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                        {data.status === 2 && (
                          <span className=" text-white py-1.5 px-3 rounded inline-block">
                            Expired
                          </span>
                        )}
                        {data.status === 3 && (
                          <span className=" text-white py-1.5 px-3 rounded inline-block">
                            Finished
                          </span>
                        )}
                        {data.status === 4 && (
                          <div className="flex flex-col items-center gap-2">
                            <span className=" text-white py-1.5 px-3 rounded inline-block w-full">
                              Claimable
                            </span>
                            <Button
                              onClick={() => showConvertModal(data.id)}
                              className="!bg-blue-color !text-white border !border-blue-color w-full"
                            >
                              Convert to Cash
                            </Button>
                          </div>
                        )}
                        {data.status === 5 && (
                          <span className=" text-white py-1.5 px-3 rounded inline-block">
                            Claimed
                          </span>
                        )}
                      </td>
                      <td className={`${tableTdStyle} last:text-right`}>
                        {data.expired_at}
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan={TableHead.length}>
                    <Empty className="my-10" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Suspense>

        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalPages * pageSize}
          onChange={(page) => {
            setCurrentPage(page);
            getFetchData(page);
          }}
          className="mt-5"
        />
      </Card>

      {/* Cancel Confirmation Modal */}
      <Modal
        centered
        visible={isCancelModalVisible}
        onCancel={handleCancelModal}
        className="bonus-modal"
      >
        <div className="p-5 flex flex-col text-center gap-5">
          <div className="flex flex-col gap-1 justify-center items-center">
            <CiWarning className="text-5xl text-blue-color" />
            <H4 name="Warning" className="!text-blue-color" />
          </div>

          <P
            name="Deleting a bonus will remove any winnings you have earned from it.
            Deletion action is irreversible"
          />

          <div className="flex items-center justify-center gap-5">
            <Button
              key="submit"
              type="primary"
              onClick={handleCancelBonus}
              className="!bg-blue-color !text-white w-32"
            >
              Yes, Cancel it
            </Button>

            <Button key="back" onClick={handleCancelModal} className="w-32">
              Close
            </Button>
          </div>
        </div>
      </Modal>

      {/* Convert Confirmation Modal */}
      <Modal
        centered
        visible={isConvertModalVisible}
        onCancel={handleConvertModal}
        className="bonus-modal"
      >
        <div className="p-5 flex flex-col text-center gap-5">
          <div className="flex flex-col gap-1 justify-center items-center">
            <CiWarning className="text-5xl text-blue-color" />
            <H4 name="Warning" className="!text-blue-color" />
          </div>

          <P name="Any bonus is limited to a maximum withdrawal value of 6 times your deposit amount. Remaining balance will be forfeited. Do you want to convert bonus to cash?" />

          <div className="flex items-center justify-center gap-5">
            <Button
              key="submit"
              type="primary"
              onClick={handleConvertToCash}
              className="!bg-blue-color !text-white w-32"
            >
              Yes, Convert it
            </Button>

            <Button key="back" onClick={handleConvertModal} className="w-32">
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};
