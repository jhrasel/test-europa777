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
      console.log("fetchFreeSpinAPI", data);
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

          {/* {isLoading ? (
            <CustomSkeleton hasImage={true} hasText={true} />
          ) : (
            
          )} */}

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
                        <td className={`${tableTdStyle}`}>{data.title}</td>
                        <td className={`${tableTdStyle}`}>
                          {data.freespins_available}
                        </td>
                        <td className={`${tableTdStyle}`}>
                          {data.freespins_used}
                        </td>
                        <td className={`${tableTdStyle}`}>
                          {data.status === 0 && (
                            <div className="flex flex-col items-center gap-2">
                              <span className="text-white py-1.5 px-3 rounded inline-block w-full">
                                Pending
                              </span>
                            </div>
                          )}
                          {data.status === 1 && (
                            <span className=" text-white py-1.5 px-3 rounded inline-block">
                              Active
                            </span>
                          )}
                          {data.status === 2 && (
                            <span className=" text-white py-1.5 px-3 rounded inline-block">
                              Completed
                            </span>
                          )}
                          {data.status === 3 && (
                            <div className="flex flex-col items-center gap-2">
                              <span className=" text-white py-1.5 px-3 rounded inline-block w-full">
                                Cancelled
                              </span>
                            </div>
                          )}
                          {data.status === 4 && (
                            <span className=" text-white py-1.5 px-3 rounded inline-block">
                              Expired
                            </span>
                          )}
                          {data.status === 5 && (
                            <span className=" text-white py-1.5 px-3 rounded inline-block">
                              Claimed
                            </span>
                          )}
                        </td>
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
      </section>
    </>
  );
};
