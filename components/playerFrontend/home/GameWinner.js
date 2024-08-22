import { Container, H2, H5, H6, UIImage } from "@/components/UI";
import { GiPodiumWinner } from "react-icons/gi";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay } from "swiper/modules";

export default function GameWinner({ getGameWinnerData }) {
  const getData = getGameWinnerData.latestWinners;

  return (
    <>
      <section className="mt-5">
        <Container>
          <div className="">
            <div className="flex items-center gap-2 mb-5">
              <GiPodiumWinner className="text-xl tab:text-3xl text-white" />
              <H2 name="Latest Winner" />
            </div>

            <div className="">
              {
                <div>
                  <Swiper
                    className="mySwiper"
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    breakpoints={{
                      320: {
                        slidesPerView: 1.3,
                        spaceBetween: 10,
                      },
                      768: {
                        slidesPerView: 2.9,
                        spaceBetween: 15,
                      },
                      1024: {
                        slidesPerView: 4.2,
                        spaceBetween: 15,
                      },
                    }}
                  >
                    {getData.map((winner) => (
                      <SwiperSlide key={winner.game_name}>
                        <div className="flex items-center gap-3 bg-bg-color1 p-3 rounded-lg">
                          <div className="">
                            <UIImage
                              src={winner.thumbnail}
                              alt={winner.username}
                              className="!w-16 !h-16 rounded-lg"
                            />
                          </div>
                          <div className="">
                            <H6
                              name={winner.username}
                              className="!text-text-color-primary"
                            />
                            <H5
                              name={`${winner.win_amount} $`}
                              className="!text-white"
                            />
                            <H6
                              name={winner.game_name}
                              className="!text-text-color-primary line-clamp-1"
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              }
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
