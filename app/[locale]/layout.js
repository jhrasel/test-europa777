import Layout from "@/components/Layout";
import { FavoriteGamesProvider } from "@/context/FavoriteGamesContext";
import { LoadingProvider } from "@/context/LoadingContext";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "Europa777",
  description: "Europa777",
  head: {
    link: [
      {
        rel: "icon",
        type: "/favicon.ico",
        href: "/favicon.ico",
      },
    ],
  },
};

export default function RootLayout({ children, params: { locale } }) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <LoadingProvider>
            <FavoriteGamesProvider>
              <Layout>{children}</Layout>
            </FavoriteGamesProvider>
          </LoadingProvider>
          <Toaster position="top-right" />
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GTAGID} />
    </html>
  );
}
