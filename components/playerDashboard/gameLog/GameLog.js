"use client";

import { Card, H4 } from "@/components/UI";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import useApi from "@/helpers/apiRequest";
import { Empty, Pagination } from "antd";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const GameLog = () => {
  // ;
  const [datas, setDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { fetchData, isLoading } = useApi();

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

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await fetchData(
        "/player/getGamePlayHistory",
        "GET"
      );

      if (data) {
        console.log("getGamePlayHistory", data.gamePlayHistory);
        const { data: gameData, total } = data.gamePlayHistory;
        setDatas(gameData);
        setTotalPages(Math.ceil(total / pageSize));
      } else if (error) {
        toast.error(responseData.message);
      }
    };

    fetchUserData();
  }, [fetchData, currentPage]);

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
    </>
  );
};
