"use client";

import { Card, H4 } from "@/components/UI";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import useApi from "@/helpers/apiRequest";
import { Empty, Pagination } from "antd";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const ActiveBonusData = () => {
  const [data, setData] = useState([]);
  const { fetchData, isLoading, setIsLoading } = useApi();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
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

  const fetchUserData = async () => {
    const { data, error } = await fetchData("/player/getActiveBonus", "GET");

    if (data) {
      console.log("getActiveBonus", data.activeBonus.data);
      setData(data.activeBonus.data);
      setTotalPages(Math.ceil(data.activeBonus.total / pageSize));
    } else if (error) {
      console.error("API Request Error:", error);
      toast.error(
        error.message || "An error occurred while fetching free spins history."
      );
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [fetchData, currentPage]);

  let serialNumber = (currentPage - 1) * pageSize;

  return (
    <>
      <section>
        <Card className="overflow-x-auto">
          <H4
            name={t("activeBonus")}
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
