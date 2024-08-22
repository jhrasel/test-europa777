"use client";
import { Container, H2, H3, H4, H5, H6, P, UIImage } from "@/components/UI";
import VipLevel from "@/components/commons/sidebar/VipLevel";
import { useLoading } from "@/context/LoadingContext";
import { VipData } from "@/data/VIP";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import useApi from "@/helpers/apiRequest";
import useAuth from "@/helpers/useAuth";
import { useTranslations } from "next-intl";

export default function AfterLoginVIP() {
  const { loading } = useLoading();
  const { fetchData, error, isLoading } = useApi();

  const { isLoggedIn } = useAuth();

  const t = useTranslations("VipPage");

  const vipData = VipData();

  return (
    <>
      <section>
        <Container>
          <H2 name={t("VIP")} className="text-center py-5 bg-bg-color2" />
          <H3 name={t("title1")} className="my-5 text-center " />
          {/* <H4
            name={t("description")}
            className="text-center py-5 !text-white !font-normal"
          /> */}

          {isLoggedIn && <VipLevel />}

          <div className="flex flex-col gap-7 justify-center text-center mt-10">
            <div className="">
              <H4 name={t("title2")} className="!text-white" />
              <P name={t("title2Des")} className="mt-1" />
            </div>

            <div className="">
              <H4 name={t("title3")} className="!text-white" />
              <P name={t("title3Des")} className="mt-1" />
            </div>

            <div className="">
              <H4 name={t("title4")} className="!text-white" />
              <P name={t("title4Des")} className="mt-1" />
            </div>

            <div className="">
              <H4 name={t("title5")} className="!text-white" />
              <P name={t("title5Des")} className="mt-1" />
            </div>
          </div>

          <div className="w-full laptop:w-[85%] desktop:w-[70%] m-auto">
            {vipData?.map((data) => (
              <div
                key={data.id}
                className={`px-4 tab:px-10 mt-10 tab:flex gap-5 justify-between items-center rounded-xl min-h-[330px]`}
                style={{ background: data.cardBg }}
              >
                {loading && (
                  <div key={data.id} className="mt-5">
                    <CustomSkeleton hasImage={true} hasText={false} />
                  </div>
                )}
                {!loading && (
                  <>
                    {/* img */}
                    <div className="tab:w-[25%] py-6">
                      <UIImage
                        src={data.image}
                        alt="img"
                        className="!w-[50%] m-auto tab:!w-full !h-auto"
                      />
                    </div>
                    {/* text */}
                    <div className="tab:w-[70%]">
                      <h3
                        className="mob:text-3xl laptop:text-4xl text-white font-bold py-5 text-center"
                        style={{ background: data.titleBg }}
                      >
                        {data.title}
                      </h3>
                      {/* middle text */}
                      <div className="mt-5 tab:mt-10 grid mob:gap-y-3 tab:grid-cols-4 border-b border-text-color-primary tab:pb-7 pb-5 tab:mb-7">
                        {/* item */}
                        <div className="text-center">
                          <H3
                            name={data.compPoint}
                            className="!text-3xl tab:!text-4xl"
                          />
                          <H6
                            name={t("COMP POINTS")}
                            className="mt-2 text-text-color-primary"
                          />
                        </div>
                        {/* item */}
                        <div className="text-center">
                          <H3
                            name={data.dailyPoint}
                            className="!text-3xl tab:!text-4xl"
                          />
                          <H6
                            name={t("DAILY CASHBACK")}
                            className="mt-2 text-text-color-primary"
                          />
                        </div>
                        {/* item */}
                        <div className="text-center">
                          <H3
                            name={data.weeklyPoint}
                            className="!text-3xl tab:!text-4xl"
                          />
                          <H6
                            name={t("WEEKLY CASHBACK")}
                            className="mt-2 text-text-color-primary"
                          />
                        </div>
                        {/* item */}
                        <div className="text-center">
                          <H3
                            name={data.wager}
                            className="!text-3xl tab:!text-4xl"
                          />
                          <H6
                            name={t("WAGER")}
                            className="mt-2 text-text-color-primary"
                          />
                        </div>
                      </div>
                      {/* footer text */}
                      <div className="flex items-center justify-center mob: py-3">
                        <H5
                          name={t("SPECIAL EVENT")}
                          className="pr-3 mr-3 border-r border-text-color-primary !text-white"
                        />
                        <H5
                          name={t("PERSONAL MANAGER")}
                          className="!text-white"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8">
            <H3 name="MORE ABOUT VIP PROGRAM:" />

            <ul className="text-white mt-5 flex flex-col gap-3">
              <li>
                1. Each $60 real money bet in slots will bring you 1 comppoint.
              </li>
              <li>
                2. Our daily and weekly cashback is calculated based on real
                money loss during the period.
              </li>
              <li>3. The cashback is added on Monday.</li>
              <li>
                4. The maximum cashback amount is limited to $3,000 for all VIP
                Levels.
              </li>
              <li>
                5. The percentage of cashbacks, the amount of comppoints needed,
                and wagering requirements are as the above
              </li>
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
