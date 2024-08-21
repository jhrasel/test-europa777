"use client";
import { Card, H4 } from "@/components/UI";
import { Cashback } from "@/components/playerFrontend";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import useApi from "@/helpers/apiRequest";
import useAuth from "@/helpers/useAuth";
import { Empty, Pagination } from "antd";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CashbackDB = () => {
  const [datas, setDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { fetchData, isLoading } = useApi();
  const { isLoggedIn, logout } = useAuth();

  const t = useTranslations("tableData");

  const TableHead = [
    t("sl"),
    t("totalDeposit"),
    t("cashbackAmount"),
    t("status"),
    t("expireOn"),
  ];

  const pageSize = 10;

  const tableTdStyle =
    "text-center border-b border-gray-50 p-3 text-sm font-normal text-white capitalize";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from the API
        const response = await fetchData("/player/getCashbackHistory", "GET");

        if (response && response.cashbackHistory) {
          console.log("getCashbackHistory", response.cashbackHistory.data);
          setDatas(response.cashbackHistory.data);
          setTotalPages(Math.ceil(response.cashbackHistory.total / pageSize));
        } else {
          console.error("Invalid response data:", response);
          setDatas([]);
          setTotalPages(0);
        }
      } catch (error) {
        console.error("Error fetching cashback history data:", error);

        // Display error notification
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }

        setDatas([]);
        setTotalPages(0);
      }
    };

    fetchUserData();
  }, [fetchData, currentPage]);

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
              {isLoading ? (
                <CustomSkeleton hasImage={true} hasText={true} />
              ) : (
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
                    {datas.length > 0 ? (
                      <>
                        {datas.map((data) => (
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
              )}

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
          </div>
        </section>
      )}

      <Cashback />
    </>
  );
};
