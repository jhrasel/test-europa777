"use client";

import { Card, H3, H4, UILinkBG } from "@/components/UI";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import useApi from "@/helpers/apiRequest";
import { Empty, Pagination } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import PromoCodeInput from "../deposit/PromoCodeInput";
import toast from "react-hot-toast";

export const FreeSpin = () => {
  // ;
  const [datas, setDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { fetchData, isLoading } = useApi();
  const [freeSpin, setFreeSpin] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const locale = useLocale();

  const t = useTranslations("tableData");

  const TableHead = [
    t("sl"),
    t("title"),
    t("freeSpinsAvailable"),
    t("freeSpinsUsed"),
    t("status"),
    t("createdAt"),
    t("expireOn"),
  ];

  const pageSize = 10;

  const tableTdStyle =
    "text-center border-b border-gray-50 p-3 text-sm font-normal text-white capitalize";

  const fetchUserData = async () => {
    const { data, error } = await fetchData(
      "/player/getFreeSpinsHistory",
      "GET"
    );

    if (data) {
      // console.log("free spin", data);
      setFreeSpin(data.freeSpinRemaining);
      setDatas(data.freeSpins.data);
      setTotalPages(Math.ceil(data.freeSpins.total / pageSize));
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

  const handlePromoCodeChange = (newPromoCode) => {
    setPromoCode(newPromoCode);
  };

  let serialNumber = (currentPage - 1) * pageSize;

  return (
    <>
      <section>
        <Card className="overflow-x-auto">
          <PromoCodeInput
            className="!border-none m-auto"
            initialPromoCode={promoCode}
            onPromoCodeChange={handlePromoCodeChange}
          />

          <div className="flex flex-col gap-3 items-center justify-center mb-5">
            <div className="text-center">
              <H3
                name="You Have"
                className="!text-white !text-2xl tab:!text-4xl uppercase"
              />
              <H3
                name={freeSpin}
                className="!text-white !text-4xl tab:!text-5xl uppercase"
              />
              <H3
                name="Free Spin"
                className="!text-white !text-2xl tab:!text-4xl uppercase"
              />
            </div>
            <UILinkBG
              name="Play Free Spin"
              href={`/${locale}/free-spin-games`}
              // target="_blank"
              className="uppercase font-medium"
            />
          </div>

          <H4
            name={t("freeSpinsHistory")}
            className="!text-indigo-500 text-center mb-3"
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
                        <td className={`${tableTdStyle}`}>{data.title}</td>
                        <td className={`${tableTdStyle}`}>
                          {data.freespins_available}
                        </td>
                        <td className={`${tableTdStyle}`}>
                          {data.freespins_used}
                        </td>
                        <td className={`${tableTdStyle}`}>{data.status}</td>
                        <td className={`${tableTdStyle}`}>{data.created_at}</td>
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
      </section>
    </>
  );
};
