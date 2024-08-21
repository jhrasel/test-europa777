// import createMiddleware from "next-intl/middleware";
// // import { NextResponse } from "next/server";

// // export const config = {
// //   matcher: "/player-dashboard/:path*",
// // };

// // export async function middleware(request) {
// //   const token = request.cookies.get("token");
// //   if (request.url.includes("/player-dashboard/cashback")) {
// //     // Allow access to /player-dashboard/cashback without login
// //     return NextResponse.next();
// //   } else {
// //     // Redirect to homepage if token is not present
// //     if (!token) {
// //       return NextResponse.redirect(new URL("/", request.url));
// //     }
// //     return NextResponse.next();
// //   }
// // }

// export default createMiddleware({
//   // A list of all locales that are supported
//   locales: ["en", "de", "es", "fr"],

//   // Used when no locale matches
//   defaultLocale: "en",
// });

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ["/", "/(de|es|fr|en)/:path*"],
// };

import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "de", "es", "fr"],

  // Used when no locale matches
  defaultLocale: "en",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(de|es|fr|en)/:path*"],
};
