"use client";

import { Card, H4 } from "@/components/UI";
import { fetchGameLogAPI } from "@/lib/fetchActiveBonusAPI";
import { Empty, Pagination } from "antd";
import { useTranslations } from "next-intl";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FadeLoader } from "react-spinners";

export const GameLog = () => {
  const [getData, setGetData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const t = useTranslations("tableData");

  const TableHead = [
    t("sl"),
    t("gameName"),
    t("type"),
    t("betAmount"),
    t("winAmount"),
    t("balance"),
    t("currency"),
    t("date"),
  ];

  const pageSize = 10;

  const tableTdStyle =
    "text-center border-b border-gray-50 p-3 text-sm font-normal text-white capitalize";

  const getFetchData = async (page = 1) => {
    setIsLoading(true);
    try {
      const data = await fetchGameLogAPI(page);
      console.log("fetchGameLogAPI", data.gamePlayHistory);
      setGetData(data.gamePlayHistory.data);
      setTotalPages(data.gamePlayHistory.last_page);
      setCurrentPage(data.gamePlayHistory.current_page);
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

  return (
    <>
      <section>
        <div className="">
          <Card className="overflow-x-auto">
            <H4
              name={t("gamePlayHistory")}
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
                  {getData.length > 0 ? (
                    <>
                      {getData.map((data) => (
                        <tr key={data.id}>
                          <td className={`${tableTdStyle} first:text-left`}>
                            {++serialNumber}
                          </td>
                          <td className={`${tableTdStyle}`}>{data.game}</td>
                          <td className={`${tableTdStyle}`}>{data.type}</td>
                          <td className={`${tableTdStyle}`}>
                            {data.bet_amount}
                          </td>
                          <td className={`${tableTdStyle}`}>
                            {data.win_amount}
                          </td>
                          <td className={`${tableTdStyle}`}>
                            {data.player_balance}
                          </td>
                          <td className={`${tableTdStyle}`}>{data.currency}</td>
                          {/* <td className={`${tableTdStyle}`}>{data.status}</td> */}
                          <td className={`${tableTdStyle} text-right`}>
                            {data.created_at}
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
        </div>
      </section>
    </>
  );
};
