"use client";

import { Container, UIImage } from "@/components/UI";
import SignUp from "@/components/signUp/SignUp";
import { useLoading } from "@/context/LoadingContext";
import { BannerImageDesktop, BannerImageMobile } from "@/data/BannerImage";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import { Carousel } from "antd";
import { Fragment } from "react";
import GameName from "./GameName";

const Banner = () => {
  const { loading } = useLoading();

  // Generate a timestamp to prevent caching
  const timestamp = new Date().getTime();

  return (
    <section>
      <Container>
        <div className="relative">
          {/* desktop */}
          <div className="hidden tab:block relative">
            <Carousel autoplay>
              {BannerImageDesktop?.map((data, i) => (
                <Fragment key={i}>
                  {loading && <CustomSkeleton hasImage={true} hasText={true} />}
                  {!loading && (
                    <>
                      <UIImage
                        src={`${data.images}?t=${timestamp}`}
                        width="1000"
                        height="480"
                        alt="banner"
                        className="w-full tab:h-[480px] object-cover rounded-3xl"
                        quality={40}
                        priority={false}
                        placeholder="blur"
                      />
                    </>
                  )}
                </Fragment>
              ))}
            </Carousel>

            {/* position img */}
            <div className="absolute bottom-3 left-0 w-full h-full z-10 flex items-end justify-center">
              <SignUp className="absolute bottom-3 w-[250px] h-[80px] opacity-0" />
              {loading && <CustomSkeleton hasImage={true} hasText={true} />}
              {!loading && (
                <>
                  <UIImage
                    src={`/images/banner/join-now.png?t=${timestamp}`} // Append timestamp to image URL
                    alt="join"
                    className="!w-[250px] !h-auto"
                    quality={45}
                    priority={false}
                    placeholder="blur"
                  />
                </>
              )}
            </div>
          </div>

          {/* mobile */}
          <div className="tab:hidden relative">
            <Carousel autoplay>
              {BannerImageMobile?.map((data, i) => (
                <Fragment key={i}>
                  {loading && <CustomSkeleton hasImage={true} hasText={true} />}
                  {!loading && (
                    <>
                      <UIImage
                        src={`${data.images}?t=${timestamp}`} // Append timestamp to image URL
                        width="400"
                        height="400"
                        alt="banner"
                        className="w-full tab:h-full object-cover rounded-3xl"
                        quality={45}
                      />
                    </>
                  )}
                </Fragment>
              ))}
            </Carousel>

            {/* position img */}
            <div className="absolute bottom-3 left-0 w-full h-full z-10 flex items-end justify-center">
              <SignUp className="absolute bottom-3 w-[180px] tab:w-[250px] h-[80px] opacity-0" />
              {loading && <CustomSkeleton hasImage={true} hasText={true} />}
              {!loading && (
                <>
                  <UIImage
                    src={`/images/banner/join-now.png?t=${timestamp}`} // Append timestamp to image URL
                    alt="join"
                    className="!w-[150px] !h-auto"
                    quality={45}
                  />
                </>
              )}
            </div>
          </div>
          <GameName />
        </div>
      </Container>
    </section>
  );
};

export default Banner;
