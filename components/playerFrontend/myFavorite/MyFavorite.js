"use client";

import { Container, UIImage } from "@/components/UI";
import SignIn from "@/components/signIn/SignIn";
import useAuth from "@/helpers/useAuth";
import AfterLoginMyFavorite from "./AfterLoginMyFavorite";

export const MyFavorite = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <section>
        <Container>
          {isLoggedIn ? (
            <AfterLoginMyFavorite />
          ) : (
            <div className="text-center w-full laptop:!w-[25%] !h-auto m-auto relative">
              <UIImage
                src="/images/favorite-login.png"
                className="w-full h-auto object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <SignIn className="!w-full !h-full opacity-0" />
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
};
