"use client";

import useApi from "@/helpers/apiRequest";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { SignUpForm } from "./SignUpForm";

export const SignUpFormWrapper = ({ handleSignUpSuccess }) => {
  const { fetchData, error, isLoading } = useApi();
  const [defaultCountry, setDefaultCountry] = useState(null);

  useEffect(() => {
    const getCountry = async () => {
      const { data } = await fetchData("/getCountry", "GET");
      if (data) {
        setDefaultCountry(data.data);
      } else {
        setDefaultCountry({ name: "United States of America", code: "US" });
      }
    };
    getCountry();
  }, []);

  if (!defaultCountry) {
    return (
      <div className="max-w-md mx-auto">
        <div className="mb-4">
          <Skeleton width={100} height={20} />
          <Skeleton width="100%" height={40} className="mt-2" />
        </div>
        <div className="flex gap-x-4 mb-4">
          <div className="mb-4 w-1/2">
            <Skeleton width={100} height={20} />
            <Skeleton width="100%" height={40} className="mt-2" />
          </div>
          <div className=" w-1/2">
            <Skeleton width={100} height={20} />
            <Skeleton width="100%" height={40} className="mt-2" />
          </div>
        </div>
        <div className="flex gap-x-4 mb-4">
          <div className="mb-4 w-1/2">
            <Skeleton width={100} height={20} />
            <Skeleton width="100%" height={40} className="mt-2" />
          </div>
          <div className="w-1/2">
            <Skeleton width={100} height={20} />
            <Skeleton width="100%" height={40} className="mt-2" />
          </div>
        </div>
        <div className="mb-4">
          <Skeleton width="75%" height={20} className="mt-2" />
        </div>
        <div className="mb-4">
          <Skeleton width="75%" height={20} className="mt-2" />
        </div>
        <div className="mb-8">
          <Skeleton width="75%" height={20} className="mt-2" />
        </div>
        <div className="mt-8">
          <Skeleton width="100%" height={50} />
        </div>
      </div>
    );
  }

  return (
    <SignUpForm
      onSignUpSuccess={handleSignUpSuccess}
      defaultCountry={defaultCountry}
    />
  );
};
