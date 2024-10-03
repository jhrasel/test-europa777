"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { UIButton } from "../UI";

const SignUp = ({ className }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("Common");

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const showModal = () => {
    router.push(pathname + "?" + createQueryString("modal", "sign-up"));
  };

  return (
    <UIButton
      name={t("Sign Up")}
      onClick={showModal}
      className={`bg-blue-color ${className}`}
    />
  );
};

export default SignUp;
