"use client";

import { useState, useEffect } from "react";
import * as FingerprintJS from "@fingerprintjs/fingerprintjs-pro";

export const useFingerPrint = () => {
  const [fingerprint, setFingerprint] = useState();

  useEffect(() => {
    const getFp = async () => {
      // Initialize an agent at application startup.
      const fpPromise = await FingerprintJS.load({
        apiKey: process.env.NEXT_PUBLIC_FINGERPRINTJS_PUBLIC_KEY,
      });
      const result = await fpPromise.get();
      setFingerprint(result.visitorId);
    };

    getFp();
  }, []);

  return fingerprint;
};
