"use client";
import { Container, H3, H4, HeaderTitle, ImageCard } from "@/components/UI";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { useLoading } from "@/context/LoadingContext";
import { BonusPromotionData } from "@/data/BonusPromotion";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRef } from "react";
import { BsGiftFill } from "react-icons/bs";
import { Autoplay, Navigation } from "swiper/modules";

export const BonusPromotion = () => {
  const { loading } = useLoading();
  const t = useTranslations("HomePage");
  const locale = useLocale();

  const swiperRef = useRef(null);

  return (
    <>
      <div className="pt-5" data-aos="fade-up">
        <Container>
          {/* <HeaderTitle
            icon={<BsGiftFill />}
            title={t("Bonus & Promotion")}
            href=""
          /> */}

          <HeaderTitle
            icon={<BsGiftFill />}
            title={t("Bonus & Promotion")}
            swiperArrow={true}
            href={`/${locale}/bonus`}
          />

          <div className="" data-aos="fade-up">
            <Swiper
              ref={swiperRef}
              navigation={{
                prevEl: ".prev",
                nextEl: ".next",
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1.2,
                  spaceBetween: 8,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
              modules={[Autoplay, Navigation]}
              className="mySwiper"
            >
              {loading && <CustomSkeleton hasImage={true} hasText={false} />}
              {!loading && (
                <>
                  {BonusPromotionData.map((item, i) => (
                    <SwiperSlide key={i}>
                      <Link
                        className="relative ease-in duration-200 translate-y-0 hover:-translate-y-1 block"
                        href={`/${locale}/bonus/`}
                      >
                        <ImageCard
                          image={item.image}
                          className="hover:!blur-0 !h-[auto]"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-[#00000045] flex flex-col justify-start pt-5 tab:pt-6 pl-4 tab:pl-5">
                          <H4 name={"Lord Reload"} className="!text-white " />
                          <H3
                            name={"25% Reload up to 400 €/$"}
                            className="!text-2xl tab:!text-3xl laptop:!text-4xl !text-white w-[60%] mt-1 tab:mt-3"
                          />
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </>
              )}
            </Swiper>
          </div>
        </Container>
      </div>
    </>
  );
};
