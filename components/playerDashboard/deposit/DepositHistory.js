"use client";
import { Card, H4 } from "@/components/UI";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import useApi from "@/helpers/apiRequest";
import { Empty, Pagination } from "antd";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const DepositHistory = () => {
  const [depositDatas, setDepositData] = useState([]);
  const { fetchData, isLoading, setIsLoading } = useApi();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const t = useTranslations("tableData");

  const pageSize = 10;

  const TableHead = [
    t("sl"),
    t("amount"),
    t("currency"),
    // t("transactionId"),
    t("paymentMethod"),
    t("status"),
    t("createdAt"),
  ];
  const tableTdStyle =
    "mob:w-[120px] text-center border-b border-gray-50 p-3 text-sm font-normal text-white capitalize";

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await fetchData(
        "/player/getPaymentHistory",
        "GET"
      );

      if (data) {
        // console.log("deposit data", data);
        const { deposits } = data.payment_history;
        setDepositData(deposits.data);
        setTotalPages(Math.ceil(deposits.total / pageSize));
      } else if (error) {
        toast.error(error.message);
      }
    };

    fetchUserData();
  }, [fetchData, currentPage, pageSize]);

  let serialNumber = (currentPage - 1) * pageSize;

  return (
    <>
      <section>
        <Card className="overflow-x-auto">
          <H4
            name={t("depositHistory")}
            className="!text-indigo-500 text-center mb-5"
          />

          <div className="w-full overflow-x-auto">
            {isLoading ? (
              <CustomSkeleton hasImage={true} hasText={true} />
            ) : (
              <table className="table-fixed w-full">
                <thead>
                  <tr className="bg-[#ececec]">
                    {TableHead?.map((data, i) => (
                      <th
                        key={i}
                        className="p-3 text-base font-bold first:text-left md:text-center mob:w-[120px] first:mob:w-[50px]"
                      >
                        {data}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {depositDatas.length > 0 ? (
                    <>
                      {depositDatas.map((depositData) => (
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
                          {/* <td className={`${tableTdStyle}  md:text-center`}>
                            {depositData.transaction_id}
                          </td> */}
                          <td className={`${tableTdStyle} md:text-center`}>
                            {depositData.payment_method}
                          </td>
                          <td className={`${tableTdStyle} md:text-center`}>
                            {depositData.status}
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
                      <td
                        colSpan={TableHead.length}
                        className="text-center p-4"
                      >
                        <Empty description="No data available" />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* pagination */}
          <div className="text-right mt-5">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalPages * pageSize}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        </Card>
      </section>
    </>
  );
};
