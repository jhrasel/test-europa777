import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["en", "de", "es", "fr"],
  defaultLocale: "en",
});

function authMiddleware(request) {
  const { pathname } = request.nextUrl;
  const supportedLocales = ["en", "de", "es", "fr"];

  const locale = supportedLocales.find((loc) =>
    pathname.startsWith(`/${loc}/player-dashboard`)
  );

  if (locale) {
    const userToken = request.cookies.get("isLoggedIn");

    if (!userToken) {
      return NextResponse.redirect(new URL("/?modal=sign-in", request.url));
    }
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
