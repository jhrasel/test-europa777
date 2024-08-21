"use client";

import useApi from "@/helpers/apiRequest";
import useCookies from "@/helpers/useCookies";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function AuthVerifyComponent() {
  const searchParams = useSearchParams();
  const { cookies, setCookies } = useCookies();
  const { fetchData, error, isLoading } = useApi();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const validate = async () => {
      const token = searchParams.get("token");

      const { data, error } = await fetchData("/user", "GET", {}, token);
      if (data && data.email_verified_at) {
        setCookies("token", token);
        setCookies("isLoggedIn", true);
        setAuthenticated(true);
      } else if (error) {
        window.location.href = "/";
      }
    };

    if (searchParams.has("token")) {
      validate();
    } else {
      window.location.href = "/";
    }
  }, [searchParams, setCookies, fetchData]);

  useEffect(() => {
    if (authenticated) {
      window.location.href = "/";
    }
  }, [authenticated]);

  return (
    <>
      <h2
        className="!text-center mt-5 font-bold flex items-center justify-center"
        style={{ textAlign: "center" }}
      >
        Redirecting...
      </h2>
    </>
  );
}

export default function AuthVerify() {
  return (
    <html>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthVerifyComponent />
        </Suspense>
      </body>
    </html>
  );
}
