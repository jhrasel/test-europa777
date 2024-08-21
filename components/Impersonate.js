"use client";

import useApi from "@/helpers/apiRequest";
import useCookies from "@/helpers/useCookies";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function ImpersonateComponent() {
  const searchParams = useSearchParams();
  const { cookies, setCookies } = useCookies();
  const { fetchData, error, isLoading } = useApi();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const validate = async () => {
      const auth_token = searchParams.get("token");
      const admin_token = searchParams.get("admin");

      const { data, error } = await fetchData("/impersonate/verify", "POST", {
        admin_token,
      });
      if (searchParams.has("token") && data && data.data) {
        setCookies("token", auth_token);
        setCookies("admin_token", admin_token);
        setCookies("isLoggedIn", true);
        setAuthenticated(true);
      } else if (error) {
        window.location.href = "/";
      }
    };

    if (searchParams.has("token") && searchParams.has("admin")) {
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

export default function Impersonate() {
  return (
    <html>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <ImpersonateComponent />
        </Suspense>
      </body>
    </html>
  );
}
