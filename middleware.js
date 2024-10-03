import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["en", "de", "es", "fr"],
  defaultLocale: "en",
});

const supportedLocales = ["en", "de", "es", "fr"];

const kycRedirect = async (request) => {
  const { pathname } = request.nextUrl;
  const dashboard = supportedLocales.find((loc) =>
    pathname.startsWith(`/${loc}/player-dashboard`)
  );
  const wheel = supportedLocales.find((loc) =>
    pathname.startsWith(`/${loc}/wheel-bonus`)
  );
  const bonus = supportedLocales.find((loc) =>
    pathname.startsWith(`/${loc}/bonus`)
  );
  const verifyUrl = supportedLocales.find((loc) =>
    pathname.startsWith(`/${loc}/player-dashboard/verification`)
  );

  if ((dashboard || wheel || bonus) && !verifyUrl) {
    const token = request.cookies.get("token");
    try {
      // Make an API call directly with fetch
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/kyc/kycStatus`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.value}`, // If token is required in header
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch KYC status");
      }

      const data = await response.json();

      if (
        data &&
        ["asked", "rejected", "submitted"].includes(data.kyc_status)
      ) {
        return dashboard || wheel || bonus;
      }
    } catch (error) {}
  }

  return false;
};

async function authMiddleware(request) {
  const { pathname } = request.nextUrl;

  const dashboard = supportedLocales.find((loc) =>
    pathname.startsWith(`/${loc}/player-dashboard`)
  );

  const loggedUser = request.cookies.get("isLoggedIn");
  if (dashboard && !loggedUser) {
    return NextResponse.redirect(new URL("/?modal=sign-in", request.url));
  }

  const locale = supportedLocales.find((loc) => pathname.startsWith(`/${loc}`));

  // Wait for kycRedirect as it's an async function
  if (!!loggedUser && (await kycRedirect(request)) && locale) {
    return NextResponse.redirect(
      new URL(`/${locale}/player-dashboard/verification`, request.url)
    );
  }

  return intlMiddleware(request);
}

export function middleware(request) {
  // Run authMiddleware next
  return authMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(de|es|fr|en)/:path*"],
};
