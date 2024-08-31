"use client";

import { Container, H3, H4, H5, UIImage, UILinkBG } from "@/components/UI";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import wheelImg from "../../../public/images/wheel_transparent.png";
import SpinGame from "./SpinGame";

const WheelBonusInfo = ({
  remainingTime,
  madeDeposit,
  daysLeft,
  spinWinNumber,
  winNumber,
  afterRegistration,
  wheelPrizes,
  prizeName,
}) => {
  const [timeLeft, setTimeLeft] = useState(remainingTime);

  const t = useTranslations("wheelBonus");

  const locale = useLocale();

  useEffect(() => {
    let interval;

    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          return prevTime - 1000;
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timeLeft]);

  const formatTime = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const wheelPrizeInfo = (number) => {
    const array = [
      "Congrats! You won 5 Free spins",
      "Try again in two hours",
      "Congrats! You won 10 Free Spins",
      "Try again in two hours",
      "Congrats! You won 15 Free Spins",
      "Try again in two hours",
      "Congrats! You won 50 Free spins",
      "Try again in two hours",
      "Congrats! You won 5 Free spins",
      "Try again in two hours",
      "Congrats! You won 10 Free spins",
      "Try again in two hours",
      "Congrats! You won 5 Free spins",
      "Try again in two hours",
    ];

    return array[number];
  };

  const wheelPrizeInfoText = (number) => {
    const array = [
      "Valid for 2 hours",
      "",
      "Valid for 2 hours",
      "",
      "Valid for 2 hours",
      "",
      "Valid for 2 hours",
      "",
      "Valid for 2 hours",
      "",
      "Valid for 2 hours",
      "",
      "Valid for 2 hours",
      "Spin the wheel every 2 hours to win a prize",
    ];

    return array[number];
  };

  return (
    <div>
      <Container>
        {remainingTime === 0 && madeDeposit === true && daysLeft !== 0 && (
          <div className="tab:w-[600px] m-auto bg-bg-color1 shadow-lg rounded-3xl p-5 text-center">
            <H4
              name={t("20days")}
              className="!text-white text-uppercase !text-base tab:!text-2xl"
            />
            <H3
              name={`${daysLeft} ${t("daysLeft")}`}
              className="!text-blue-color mt-2 !text-3xl tab:!text-4xl"
            />
            {/* Render the SpinGame component when remainingTime is 0, daysLeft > 0, and madeDeposit is true */}
            <SpinGame winNumber={winNumber} wheelPrizes={wheelPrizes} />
          </div>
        )}
        {/* Condition for users who haven't made a deposit and are within the registration period */}
        {remainingTime === 0 &&
          afterRegistration > 0 &&
          madeDeposit === false && (
            <div className="tab:w-[600px] m-auto bg-bg-color1 shadow-lg rounded-3xl p-5 text-center">
              <H3
                name={t("win500Spin")}
                className="!text-[#dd1fe5] uppercase !text-base tab:!text-3xl mb-2"
              />

              <H4
                name={t("every2hours")}
                className="!text-white text-uppercase !text-base tab:!text-2xl"
              />

              {/* Render the SpinGame component for new registered users */}
              <SpinGame winNumber={winNumber} wheelPrizes={wheelPrizes} />
            </div>
          )}
        {/* Condition for when daysLeft is 0 */}
        {daysLeft === 0 && afterRegistration === 0 && (
          <div className="relative tab:w-[600px] m-auto bg-bg-color1 shadow-lg rounded-3xl p-5 text-center">
            <H3
              name={t("win500Spin")}
              className="!text-[#dd1fe5] uppercase !text-base tab:!text-3xl mb-2"
            />

            <H4
              name={t("every2hours")}
              className="!text-white text-uppercase !text-base tab:!text-2xl mb-10"
            />
            <UIImage
              src={wheelImg}
              alt="wheel"
              className=" !h-[90%] tab:!h-[445px] !w-[90%] tab:!w-[450px] rounded-full m-auto"
            />
            <div className="absolute top-12 laptop:top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="w-[620px] m-auto bg-bg-color1 shadow-lg rounded-3xl p-5 text-center">
                <div className="text-center !text-white p-4 prizeInfoContainer">
                  <H4
                    name={t("unlock")}
                    className="!text-white text-uppercase"
                  />
                  <H5 name={t("winPrize")} className="!text-white mb-3" />

                  <UILinkBG
                    href={`/${locale}/player-dashboard/deposit`}
                    name={t("depositNow")}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Condition for remainingTime not being 0 */}
        {remainingTime !== 0 && (
          <div className="relative">
            <UIImage
              src={wheelImg}
              alt="wheel"
              className=" !h-[90%] tab:!h-[445px] !w-[90%] tab:!w-[450px] rounded-full m-auto"
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div className=" w-[620px] m-auto bg-gradient-to-r from-blue-color to-blue-600 shadow-2xl rounded-3xl p-5 text-center">
                <div className="text-center !text-white prizeInfoContainer">
                  {/* <H4
                    name={`${wheelPrizeInfo(spinWinNumber ?? 13)}`}
                    className="!text-white"
                  />
                  <H4
                    name={`${wheelPrizeInfoText(spinWinNumber ?? 13)}`}
                    className="!text-white"
                  /> */}

                  {prizeName === "No luck" ? (
                    <H4
                      name={`Try again in two hours`}
                      className="!text-white"
                    />
                  ) : (
                    <H4
                      name={`Congrats! You won ${prizeName}`}
                      className="!text-white"
                    />
                  )}

                  <H4 name={`Valid for 2 hours`} className="!text-white" />

                  <div className="mt-3 mb-2">
                    <H5 name={t("nextIn")} className="!text-white" />
                    <H4
                      name={`${formatTime(timeLeft)}`}
                      className="!text-white mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default WheelBonusInfo;
