"use client";
import { UIImage } from "@/components/UI";
import SignIn from "@/components/signIn/SignIn";
import useAuth from "@/helpers/useAuth";
import AfterLoginWheel from "./AfterLoginWheel";

export const NewWheelBonus = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      {isLoggedIn ? (
        <AfterLoginWheel />
      ) : (
        <div className="text-center w-full laptop:!w-[30%] !h-auto m-auto relative">
          <UIImage
            src="/images/when-login.png"
            alt="login"
            className="w-full h-auto object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center rounded-full">
            <SignIn className="!w-full !h-full opacity-0" />
          </div>
        </div>
      )}
    </>
  );
};
