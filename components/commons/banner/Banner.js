"use client";

import { Carousel } from "antd";

import { Container, UIImage } from "@/components/UI";
import SignUp from "@/components/signUp/SignUp";
import { useLoading } from "@/context/LoadingContext";
import { BannerImageDesktop, BannerImageMobile } from "@/data/BannerImage";
import CustomSkeleton from "@/helpers/CustomSkeleton";
// import animationData from "../../../public/animation/animation.json";
import GameName from "./GameName";
// import LottieAnimation from "./LottieAnimation";
import { Fragment } from "react";

const Banner = () => {
  const { loading } = useLoading();

  return (
    <>
      <section>
        <Container>
          <div className="relative">
            {/* desktop */}
            <div className="hidden tab:block relative">
              <Carousel autoplay>
                {BannerImageDesktop?.map((data, i) => (
                  <Fragment key={i}>
                    {loading && (
                      <CustomSkeleton hasImage={true} hasText={true} />
                    )}
                    {!loading && (
                      <>
                        <UIImage
                          src={data.images}
                          width="1920"
                          height="500"
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
              <div className=" absolute bottom-3 left-0 w-full h-full z-10 flex items-end justify-center">
                <SignUp className="absolute bottom-3 w-[250px] h-[80px] opacity-0" />
                {loading && <CustomSkeleton hasImage={true} hasText={true} />}
                {!loading && (
                  <>
                    <UIImage
                      src="/images/banner/join-now.png"
                      alt="join"
                      className="!w-[250px] !h-auto"
                      quality={45}
                    />
                  </>
                )}
              </div>
            </div>
            {/* mobile */}
            <div className=" tab:hidden relative">
              <Carousel autoplay>
                {BannerImageMobile?.map((data, i) => (
                  <Fragment key={i}>
                    {loading && (
                      <CustomSkeleton hasImage={true} hasText={true} />
                    )}
                    {!loading && (
                      <>
                        <UIImage
                          src={data.images}
                          width="500"
                          height="500"
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
              <div className=" absolute bottom-3 left-0 w-full h-full z-10 flex items-end justify-center">
                <SignUp className="absolute bottom-3 w-[180px] tab:w-[250px] h-[80px] opacity-0" />
                {loading && <CustomSkeleton hasImage={true} hasText={true} />}
                {!loading && (
                  <>
                    <UIImage
                      src="/images/banner/join-now.png"
                      alt="join"
                      className=" !w-[150px] !h-auto"
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
    </>
  );
};

export default Banner;
