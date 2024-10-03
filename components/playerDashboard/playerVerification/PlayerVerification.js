"use client";

import Loading from "@/app/[locale]/player-dashboard/loading";
import { KycVerification } from "@/components/kycVerification/KycVerification";
import useApi from "@/helpers/apiRequest";
import useAuth from "@/helpers/useAuth";
import { useEffect, useState } from "react";

export const PlayerVerification = () => {
  const { isLoggedIn } = useAuth();
  const { fetchData } = useApi();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchUserData = async () => {
        const { data, error } = await fetchData("/kyc/kycStatus", "POST");

        if (data) {
          setStatus(data.kyc_status);
        } else if (error) {
          setStatus(null);
        }
      };

      fetchUserData();
    }
  }, [isLoggedIn, fetchData]);

  const message = () => {
    switch (status) {
      case "approved":
        return "Your profile is verified";
      case "submitted":
        return "Your profile is in under verification. We will update your verification status soon";
      case "rejected":
        return "We could not verify you. UPLOAD documents";
    }
  };

  return (
    <>
      <section>
        <div className="grid tab:gap-2 laptop:gap-5">
          {!status && <Loading />}
          {["approved", "submitted", "rejected"].includes(status) && (
            <div className="flex flex-col items-center mb-12 mt-20">
              <h2 className="text-2xl font-bold text-white">{message()}</h2>
            </div>
          )}
          {["asked", "rejected"].includes(status) && (
            <KycVerification status={status} />
          )}
        </div>
      </section>
    </>
  );
};
