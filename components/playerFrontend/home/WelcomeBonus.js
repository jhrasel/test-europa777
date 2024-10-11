"use client";

import { Container, HeaderTitle, ImageCard, UILink } from "@/components/UI";
import { useLoading } from "@/context/LoadingContext";
import { WellcomeBonusData } from "@/data/WellcomeBonus";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import { Carousel } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { HiSpeakerphone } from "react-icons/hi";

export const WelcomeBonus = () => {
  const { loading } = useLoading();
  const t = useTranslations("HomePage");
  const locale = useLocale();
  return (
    <>
      <div className="pt-5">
        <Container>
          <HeaderTitle icon={<HiSpeakerphone />} title={t("Welcome Bonus")} />

          <div className="hidden tab:grid grid-cols-4 gap-2 tab:gap-5">
            {loading &&
              Array.from({ length: 3 }).map((_, index) => (
                <CustomSkeleton key={index} hasImage={true} hasText={true} />
              ))}
            {!loading && (
              <>
                {WellcomeBonusData.map((item, i) => (
                  <UILink
                    key={i}
                    href={`/${locale}/bonus`}
                    name={
                      <ImageCard
                        image={item.image}
                        className="hover:!blur-0 !w-full !h-[auto]"
                      />
                    }
                  />
                ))}
              </>
            )}
          </div>

          {/*  mobile*/}
          <div className="tab:hidden">
            <Carousel autoplay>
              {WellcomeBonusData.map((item, i) => (
                <UILink
                  key={i}
                  href={`/${locale}/bonus`}
                  name={
                    <ImageCard
                      image={item.image}
                      className="hover:!blur-0 !w-full !h-[auto]"
                    />
                  }
                />
              ))}
            </Carousel>
          </div>
        </Container>
      </div>
    </>
  );
};
