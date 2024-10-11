"use client";
import { Container, HeaderTitle, UIImage, UILink } from "@/components/UI";
import { useLocale, useTranslations } from "next-intl";
import { useRef } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules

import { Autoplay, Navigation } from "swiper/modules";

export const AllProviders = ({ getAllGameProvidersData }) => {
  const getData = getAllGameProvidersData.data;

  const t = useTranslations("HomePage");
  const locale = useLocale();

  const swiperRef = useRef(null);

  return (
    <>
      <section className="pt-5">
        <Container>
          <div className="">
            <HeaderTitle
              title={t("All Providers")}
              swiperArrow={true}
              href={`/${locale}/all-providers`}
            />

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
              modules={[Navigation, Autoplay]}
              breakpoints={{
                320: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 8,
                  spaceBetween: 12,
                },
              }}
              className="mySwiper"
            >
              {getData?.map((gameProvider) => (
                <SwiperSlide key={gameProvider.id}>
                  <div className="rounded-lg bg-bg-color1 p-2 text-center">
                    <UILink
                      href={`/${locale}/provider-games/${gameProvider.name}`}
                      className="w-full !flex-col !line-clamp-1 justify-center"
                      icon={
                        <UIImage
                          src={gameProvider.logo || "/images/default-cart.jpg"}
                          alt={gameProvider.name}
                          className="!w-full !h-14 object-contain rounded-lg transition duration-150 hover:-translate-y-1 mb-2 border-b border-bg-color3"
                        />
                      }
                      name={gameProvider.name}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* <div className="grid grid-cols-2 tab:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-6 gap-5">
              {getData.length === 0 ? (
                <H3 name="No data found" className="text-center col-span-12" />
              ) : (
                getData?.map((gameProvider) => (
                  <div
                    className="rounded-lg border border-bg-color3 p-2"
                    key={gameProvider.id}
                  >
                    <UILink
                      href={`/${locale}/provider-games/${gameProvider.name}`}
                      className="w-full !flex-col"
                      icon={
                        <UIImage
                          src={gameProvider.logo || "/images/default-cart.jpg"}
                          alt={gameProvider.name}
                          className="!w-full !h-14 tab:!h-20 object-contain rounded-lg transition duration-150 hover:-translate-y-1 mb-2 border-b border-bg-color3"
                        />
                      }
                      name={gameProvider.name}
                    />
                  </div>
                ))
              )}
            </div> */}
            {/* <div className="text-center mt-5">
              <UIButton name="Load More" className="bg-blue-color" />
            </div> */}
          </div>
        </Container>
      </section>
    </>
  );
};
