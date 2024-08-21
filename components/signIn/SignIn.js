"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { UIButtonWithoutBG } from "../UI";

const SignIn = ({ className, name }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const showModal = () => {
    router.push(pathname + "?" + createQueryString("modal", "sign-in"));
  };

  return (
    <UIButtonWithoutBG
      name={name}
      onClick={showModal}
      className={`${className}`}
    />
  );
};

export default SignIn;
