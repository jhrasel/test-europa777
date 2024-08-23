"use client";

import { Card, H4 } from "@/components/UI";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import { fetchBonusHistoryAPI } from "@/lib/fetchActiveBonusAPI";
import { Empty, Pagination } from "antd";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PromoCodeInput from "../deposit/PromoCodeInput";

export const BounsDB = () => {
  const [getData, setGetData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const t = useTranslations("tableData");

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

  const getFetchData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchBonusHistoryAPI();
      setGetData(data.bonusHistory.data);
      setTotalPages(Math.ceil(data.bonusHistory.total / pageSize));
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
  }, [currentPage]);

  let serialNumber = (currentPage - 1) * pageSize;

  return (
    <section>
      <Card className="overflow-x-auto">
        {/* Uncomment and adjust PromoCodeInput if needed */}
        {/* <H4
          name="Do you have a promo code? (Optional)"
          className="!text-red-color text-center mb-3"
        /> */}
        <PromoCodeInput className="!border-none m-auto" />
        <H4
          name={t("bonusHistory")}
          className="!text-indigo-500 text-center mb-5"
        />

        {isLoading ? (
          <CustomSkeleton hasImage={true} hasText={true} />
        ) : (
          <>
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
                        <td className={`${tableTdStyle}`}>{data.status}</td>
                        <td className={`${tableTdStyle} text-right`}>
                          {data.expired_at}
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

            {/* Pagination */}
            <div className="text-right mt-5">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalPages * pageSize}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
          </>
        )}
      </Card>
    </section>
  );
};
