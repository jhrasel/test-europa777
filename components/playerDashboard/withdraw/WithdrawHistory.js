import { Card, H4 } from "@/components/UI";
import { fetchDepositHistoryAPI } from "@/lib/fetchDepositAPI";
import { Empty, Pagination } from "antd";
import { useTranslations } from "next-intl";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FadeLoader } from "react-spinners";

export default function WithdrawHistory() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const t = useTranslations("tableData");

  const TableHead = [
    t("sl"),
    t("amount"),
    t("currency"),
    t("transactionId"),
    t("paymentMethod"),
    t("status"),
    t("createdAt"),
  ];

  const pageSize = 10;

  const tableTdStyle =
    "text-center border-b border-gray-50 p-3 text-sm font-normal text-white capitalize";

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const { data, error } = await fetchData(
  //       "/player/getPaymentHistory",
  //       "GET"
  //     );

  //     if (data) {
  //       const { data: withdrawData, total } = data.payment_history.withdraws;
  //       setwithdrawsData(withdrawData);
  //       setTotalPages(Math.ceil(total / pageSize));
  //     } else if (error) {
  //       // console.error("API Request Error:", error);
  //       toast.error(
  //         error.message || "An error occurred while fetching payment history."
  //       );
  //     }
  //   };

  //   fetchUserData();
  // }, [fetchData, currentPage]);

  const getFetchData = async (page = 1) => {
    setIsLoading(true);
    try {
      const data = await fetchDepositHistoryAPI(page);
      if (data) {
        const { withdraws } = data.payment_history;

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
                      <td className={`${tableTdStyle}`}>
                        {withdrawsData.status}
                      </td>
                      <td className={`${tableTdStyle} text-right`}>
                        {withdrawsData.created_at}
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
      </Card>
    </>
  );
}
