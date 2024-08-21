"use client";
import { Container, HeaderTitle, ImageCard } from "@/components/UI";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { useLoading } from "@/context/LoadingContext";
import { BonusPromotionData } from "@/data/BonusPromotion";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import { useTranslations } from "next-intl";
import { Autoplay, Navigation } from "swiper/modules";

export const BonusPromotion = () => {
  const { loading } = useLoading();
  const t = useTranslations("HomePage");
  return (
    <>
      <div className="pt-5" data-aos="fade-up">
        <Container>
          <HeaderTitle
            image="/images/home-page/icons/bonus-promotion.svg"
            title={t("Bonus & Promotion")}
            href=""
          />

          <div className="" data-aos="fade-up">
            <Swiper
              navigation={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1.6,
                  spaceBetween: 8,
                },
                768: {
                  slidesPerView: 3.2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4.2,
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
                      <ImageCard
                        image={item.image}
                        className="hover:!blur-0 !h-[auto]"
                      />
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
