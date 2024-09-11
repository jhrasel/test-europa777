"use client";

import { Card, H4 } from "@/components/UI";
import { Cashback } from "@/components/playerFrontend";
import useAuth from "@/helpers/useAuth";
import { fetchCashbackHistoryAPI } from "@/lib/fetchActiveBonusAPI";
import { Empty, Pagination } from "antd";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CashbackDB = () => {
  const { isLoggedIn } = useAuth();

  const [getData, setGetData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const pageSize = 10;

  const t = useTranslations("tableData");

  const TableHead = [
    t("sl"),
    t("totalDeposit"),
    t("cashbackAmount"),
    t("cashbackType"),
    t("status"),
    t("expireOn"),
  ];

  console.log("TableHead:", TableHead); // Debugging line

  const tableTdStyle =
    "text-center border-b border-gray-50 p-3 text-sm font-normal text-white capitalize";

  const getFetchData = async (page = 1) => {
    setIsLoading(true);
    try {
      const data = await fetchCashbackHistoryAPI(page);
      console.log("fetchCashbackHistoryAPI", data.cashbackHistory.data); // Debugging line
      setGetData(data.cashbackHistory.data);
      setTotalPages(data.cashbackHistory.last_page);
      setCurrentPage(data.cashbackHistory.current_page);
    } catch (error) {
      console.error("API Request Error:", error);
      toast.error(
        error.message || "An error occurred while fetching bonus history."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  let serialNumber = (currentPage - 1) * pageSize;

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Active";
      case 2:
        return "Expires";
      case 3:
        return "Cancelled";
      case 4:
        return "Claimed";
      default:
        return "Unknown";
    }
  };

  return (
    <>
      {isLoggedIn && (
        <section className="mb-10">
          <div className="">
            <Card className="overflow-x-auto">
              <H4
                name={t("cashbackHistory")}
                className="!text-indigo-500 text-center mb-5"
              />
              {
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
                    {getData.length > 0 ? (
                      <>
                        {getData.map((data) => (
                          <tr key={data.id}>
                            <td className={`${tableTdStyle} first:text-left`}>
                              {++serialNumber}
                            </td>
                            <td className={`${tableTdStyle}`}>
                              {data.deposit}
                            </td>
                            <td className={`${tableTdStyle}`}>
                              {data.amount} {data.currency}
                            </td>
                            <td className={`${tableTdStyle}`}>
                              {data.cashback_type}
                            </td>
                            <td className={`${tableTdStyle}`}>
                              {getStatusText(data.status)}
                            </td>
                            <td className={`${tableTdStyle} text-right`}>
                              {data.expire_at}
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
              }

              <div className="text-right mt-5">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={totalPages * pageSize}
                  onChange={(page) => setCurrentPage(page)}
                />
              </div>
            </Card>
          </div>
        </section>
      )}

      <Cashback />
    </>
  );
};
