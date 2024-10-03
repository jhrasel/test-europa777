"use client";
import { H5, UIImage } from "@/components/UI";
import SignIn from "@/components/signIn/SignIn";
import useAuth from "@/helpers/useAuth";
import { useTranslations } from "next-intl";
import AfterLoginWheel from "./AfterLoginWheel";

export const NewWheelBonus = () => {
  const { isLoggedIn } = useAuth();

  const t = useTranslations("wheelBonus");
  return (
    <>
      {isLoggedIn ? (
        <AfterLoginWheel />
      ) : (
        // <div className="text-center w-full laptop:!w-[30%] !h-auto m-auto relative mt-10">
        //   <UIImage
        //     src="/images/wheel_transparent.png"
        //     alt="login"
        //     className="w-full h-auto object-cover"
        //   />
        //   <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center rounded-full">
        //     <SignIn className="!w-full !h-full opacity-0" />
        //   </div>
        // </div>
        <>
          <div className="relative tab:w-[600px] m-auto bg-bg-color1 shadow-lg rounded-3xl p-5 text-center mt-5">
            <UIImage
              src="/images/wheel_transparent.png"
              alt="wheel_transparent"
              className=" !h-[90%] tab:!h-[445px] !w-[90%] tab:!w-[450px] rounded-full m-auto"
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="w-[90%] tab:w-[85%] m-auto bg-bg-color2 shadow-2xl rounded-xl p-5 tab:p-8 text-center">
                <div className="text-center !text-white prizeInfoContainer">
                  <H5
                    name={
                      "Sign up or log in now to spin the wheel for your chance to win up to 500 FREE spins!"
                    }
                    className="!text-white"
                  />

                  <SignIn name="Log In" className="mt-3 !bg-blue-color" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
