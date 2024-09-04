import { Card, H4, P } from "@/components/UI";
import { fetchDepositHistoryAPI } from "@/lib/fetchDepositAPI";
import { Button, Empty, Modal, Pagination } from "antd";
import { useTranslations } from "next-intl";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiWarning } from "react-icons/ci";
import { FadeLoader } from "react-spinners";

export default function WithdrawHistory() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [selectedBonusId, setSelectedBonusId] = useState(null);

  const t = useTranslations("tableData");

  const TableHead = [
    t("sl"),
    t("amount"),
    t("currency"),
    t("transactionId"),
    t("paymentMethod"),
    t("createdAt"),
    t("status"),
    t("action"),
  ];

  const pageSize = 10;

  const tableTdStyle =
    "text-center border-b border-gray-50 p-3 text-sm font-normal text-white capitalize";

  const getFetchData = async (page = 1) => {
    setIsLoading(true);
    try {
      const data = await fetchDepositHistoryAPI(page);
      if (data) {
        const { withdraws } = data.payment_history;

        console.log("withdraws.data", withdraws.data);

        setData(withdraws.data);
        setTotalPages(withdraws.last_page);
        setCurrentPage(withdraws.current_page);
      }
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

  const showCancelModal = (bonusId) => {
    setSelectedBonusId(bonusId);
    setIsCancelModalVisible(true);
  };

  const handleCancelModal = () => {
    setIsCancelModalVisible(false);
  };

  useEffect(() => {
    getFetchData(currentPage);
  }, []);

  let serialNumber = (currentPage - 1) * pageSize;

  return (
    <>
      <Card className="overflow-x-auto">
        <H4
          name={t("withdrawalHistory")}
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
                {TableHead?.map((data, i) => (
                  <th
                    key={i}
                    className="first:text-left last:text-right first:rounded-tl-lg last:rounded-tr-lg p-3 text-base font-bold"
                  >
                    {data}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                <>
                  {data.map((withdrawsData) => (
                    <tr key={withdrawsData.id}>
                      <td className={`${tableTdStyle} first:text-left`}>
                        {++serialNumber}
                      </td>
                      <td className={`${tableTdStyle}`}>
                        {withdrawsData.amount}
                      </td>
                      <td className={`${tableTdStyle}`}>
                        {withdrawsData.currency}
                      </td>
                      <td className={`${tableTdStyle}`}>
                        {withdrawsData.transaction_id}
                      </td>
                      <td className={`${tableTdStyle}`}>
                        {withdrawsData.payment_method}
                      </td>

                      <td className={`${tableTdStyle} text-right`}>
                        {withdrawsData.created_at}
                      </td>

                      <td className={`${tableTdStyle}`}>
                        {withdrawsData.status}
                      </td>

                      <td className={`${tableTdStyle}`}>
                        {withdrawsData.status === "pending" ||
                          withdrawsData.status === "submitted" ||
                          (withdrawsData.status === "waiting" && (
                            <div className="flex flex-col items-center gap-2">
                              <Button
                                onClick={() =>
                                  showCancelModal(withdrawsData.id)
                                }
                                className="!bg-blue-color !text-white border !border-blue-color w-full"
                              >
                                Cancel
                              </Button>
                            </div>
                          ))}

                        {withdrawsData.status === "cancelled" && ""}
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

        {/* pagination */}
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

        {/* Convert Confirmation Modal */}
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

            <P name="Do you want to cancel the withdraw?" />

            <div className="flex items-center justify-center gap-5">
              <Button
                key="submit"
                type="primary"
                onClick={handleCancelBonus}
                className="!bg-blue-color !text-white w-32"
              >
                Cancel
              </Button>

              <Button key="back" onClick={handleCancelModal} className="w-32">
                Close
              </Button>
            </div>
          </div>
        </Modal>
      </Card>
    </>
  );
}
