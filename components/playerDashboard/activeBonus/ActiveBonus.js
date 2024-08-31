"use client";

import { Card, H4, P } from "@/components/UI";
import { fetchActiveBonusAPI } from "@/lib/fetchActiveBonusAPI";
import { Button, Empty, Modal, Pagination } from "antd";
import { useTranslations } from "next-intl";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiWarning } from "react-icons/ci";
import { FadeLoader } from "react-spinners";
import PromoCodeInput from "../deposit/PromoCodeInput";

export const ActiveBonusData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [isConvertModalVisible, setIsConvertModalVisible] = useState(false);
  const [selectedBonusId, setSelectedBonusId] = useState(null);
  const t = useTranslations("tableData");

  const pageSize = 10;

  const TableHead = [
    t("sl"),
    t("amount"),
    t("currency"),
    t("wager"),
    t("wagered"),
    t("status"),
    t("createdAt"),
  ];

  const tableTdStyle =
    "mob:w-[120px] text-center border-b border-gray-50 p-3 text-sm font-normal text-white capitalize";

  const getFetchData = async (page = 1) => {
    setIsLoading(true);
    try {
      const data = await fetchActiveBonusAPI(page);
      // console.log("data.activeBonus", data.activeBonus);
      setData(data.activeBonus.data);
      setTotalPages(data.activeBonus.last_page);
      setCurrentPage(data.activeBonus.current_page);
    } catch (error) {
      toast.error(error.message);
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
      getFetchData();
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
      getFetchData();
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
  }, [currentPage]);

  let serialNumber = (currentPage - 1) * pageSize;

  return (
    <section>
      <Card className="overflow-x-auto">
        <PromoCodeInput className="!border-none m-auto" />

        <H4
          name={t("activeBonus")}
          className="!text-indigo-500 text-center mb-5"
        />

        <div className="w-full overflow-x-auto">
          <Suspense
            fallback={
              <h3 className="flex items-center gap-2 my-4 text-white">
                <FadeLoader color="#FFF" />
              </h3>
            }
          >
            <table className="table-fixed w-full">
              <thead>
                <tr className="bg-[#ececec]">
                  {TableHead?.map((header, i) => (
                    <th
                      key={i}
                      className="p-3 text-base font-bold first:text-left md:text-center mob:w-[120px] first:mob:w-[50px]"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  <>
                    {data.map((depositData) => (
                      <tr key={depositData.id}>
                        <td
                          className={`${tableTdStyle} text-left md:text-center first:mob:w-[50px]`}
                        >
                          {++serialNumber}
                        </td>
                        <td className={`${tableTdStyle} md:text-center`}>
                          {depositData.amount}
                        </td>
                        <td className={`${tableTdStyle} md:text-center`}>
                          {depositData.currency}
                        </td>
                        <td className={`${tableTdStyle} md:text-center`}>
                          {depositData.wager}
                        </td>
                        <td className={`${tableTdStyle} md:text-center`}>
                          {depositData.wagered}
                        </td>
                        <td className={`${tableTdStyle} md:text-center`}>
                          {depositData.status === 1 && (
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
                          {depositData.status === 2 && (
                            <span className=" text-white py-1.5 px-3 rounded inline-block">
                              Expired
                            </span>
                          )}
                          {depositData.status === 3 && (
                            <span className=" text-white py-1.5 px-3 rounded inline-block">
                              Finished
                            </span>
                          )}
                          {depositData.status === 4 && (
                            <div className="flex flex-col items-center gap-2">
                              <span className=" text-white py-1.5 px-3 rounded inline-block w-full">
                                Claimable
                              </span>
                              <Button
                                onClick={() => showConvertModal(depositData.id)}
                                className="!bg-blue-color !text-white border !border-blue-color w-full"
                              >
                                Convert to Cash
                              </Button>
                            </div>
                          )}
                          {depositData.status === 5 && (
                            <span className=" text-white py-1.5 px-3 rounded inline-block">
                              Claimed
                            </span>
                          )}
                        </td>

                        <td
                          className={`${tableTdStyle} text-right md:text-center`}
                        >
                          {depositData.created_at}
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan={TableHead.length} className="text-center p-4">
                      <Empty description="No data available" />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Suspense>
        </div>

        {/* Pagination */}
        <div className="text-right mt-5">
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
        </div>
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
