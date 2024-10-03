"use client";

import { Card, H3, H4, UILinkBG } from "@/components/UI";
import { fetchFreeSpinAPI } from "@/lib/fetchActiveBonusAPI";
import { Empty, Pagination } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FadeLoader } from "react-spinners";
import PromoCodeInput from "../deposit/PromoCodeInput";

export const FreeSpin = () => {
  const [getData, setGetData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
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

  const getFetchData = async (page = 1) => {
    setIsLoading(true);
    try {
      const data = await fetchFreeSpinAPI(page);
      setFreeSpin(data.freeSpinRemaining);
      setGetData(data.freeSpins.data);
      setTotalPages(data.freeSpins.last_page);
      setCurrentPage(data.freeSpins.current_page);
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

  const handlePromoCodeChange = (newPromoCode) => {
    setPromoCode(newPromoCode);
  };

  const handlePromoCodeApplied = () => {
    // Fetch updated free spin data when promo code is applied or removed
    getFetchData();
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
            onPromoCodeApplied={handlePromoCodeApplied} // Pass the new callback
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
              className="uppercase font-medium"
            />
          </div>

          <H4
            name={t("freeSpinsHistory")}
            className="!text-indigo-500 text-center mb-3"
          />

          <Suspense fallback={<FadeLoader color="#36d7b7" />}>
            {isLoading ? (
              <FadeLoader className="m-auto" color="#36d7b7" />
            ) : getData.length > 0 ? (
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr>
                    {TableHead.map((item, index) => (
                      <th
                        key={index}
                        className="text-center border-b border-gray-50 text-white capitalize"
                      >
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {getData.map((item, index) => (
                    <tr key={item.id}>
                      <td className={tableTdStyle}>
                        {serialNumber + index + 1}
                      </td>
                      <td className={tableTdStyle}>{item.title}</td>
                      <td className={tableTdStyle}>
                        {item.free_spins_available}
                      </td>
                      <td className={tableTdStyle}>{item.free_spins_used}</td>
                      <td className={tableTdStyle}>{item.status}</td>
                      <td className={tableTdStyle}>{item.created_at}</td>
                      <td className={tableTdStyle}>{item.expired_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <Empty />
            )}
          </Suspense>

          <div className="flex items-center justify-center mt-6 mb-2">
            <Pagination
              current={currentPage}
              total={totalPages * pageSize}
              onChange={(page) => getFetchData(page)}
              pageSize={pageSize}
              showSizeChanger={false}
            />
          </div>
        </Card>
      </section>
    </>
  );
};
