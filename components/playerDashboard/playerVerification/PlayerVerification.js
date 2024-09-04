"use client";

import { KycVerification } from "@/components/kycVerification/KycVerification";

export const PlayerVerification = () => {
  return (
    <>
      <section>
        <div className="grid tab:gap-2 laptop:gap-5">
          <KycVerification />
        </div>
      </section>
    </>
  );
};
