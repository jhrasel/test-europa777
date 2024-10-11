import { Container, H2, H6, UIImage } from "@/components/UI";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { IoMdTrophy } from "react-icons/io";
import { Autoplay } from "swiper/modules";

export default function GameWinner({ getGameWinnerData }) {
  const getData = getGameWinnerData.latestWinners;

  return (
    <>
      <section className="mt-5">
        <Container>
          <div className="latest-winner">
            <div className="flex items-center gap-2 mb-5">
              <IoMdTrophy className="text-xl tab:text-3xl text-white" />
              <H2 name="Latest Winner" />
            </div>

            <div className="">
              {
                <div>
                  <Swiper
                    className="mySwiper"
                    autoplay={{
                      delay: 1000,
                      disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    breakpoints={{
                      320: {
                        slidesPerView: 4,
                        spaceBetween: 5,
                      },
                      768: {
                        slidesPerView: 7,
                        spaceBetween: 5,
                      },
                      1024: {
                        slidesPerView: 13,
                        spaceBetween: 5,
                      },
                    }}
                  >
                    {getData.map((winner) => (
                      <SwiperSlide key={winner.game_name}>
                        <div className="flex flex-col items-center gap-1 bg-bg-color1 p-1 rounded-lg">
                          <div className="w-full">
                            <UIImage
                              src={winner.thumbnail}
                              alt={winner.username}
                              className="!w-full !h-20 rounded-lg"
                            />
                          </div>
                          <div className="w-full">
                            <H6
                              name={winner.username}
                              className="!text-text-color-primary"
                            />
                            <H6
                              name={`${winner.win_amount} $`}
                              className="!text-white !font-bold"
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
