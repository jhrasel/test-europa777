import { useLocale, useTranslations } from "next-intl";

export const FooterAboutData = () => {
  const t = useTranslations("Menubar");
  const locale = useLocale();

  return [
    {
      name: t("About Us"),
      url: `/${locale}/about-us`,
    },
    {
      name: t("Contact Us"),
      url: `/${locale}/contact`,
    },
    {
      name: t("FAQ"),
      link: "/faq",
      url: `/${locale}/faq`,
    },
    {
      name: t("Affiliates"),
      url: "https://affiliateslots.com/",
    },
  ];
};

export const FooterInformationData = () => {
  const t = useTranslations("Menubar");
  const locale = useLocale();

  return [
    {
      name: t("Terms & Conditions"),
      url: `/${locale}/terms-conditions`,
    },
    {
      name: t("Bonus Terms"),
      url: `/${locale}/bonus-terms`,
    },
    {
      name: t("Privacy and Security Policy"),
      url: `/${locale}/privacy-security-policy`,
    },
    {
      name: t("Responsible Gambling"),
      url: `/${locale}/responsible-gambling`,
    },
  ];
};

export const FooterQuickLinksData = () => {
  const t = useTranslations("Menubar");
  const locale = useLocale();
  return [
    {
      name: t("Deposit"),
      url: `/${locale}/player-dashboard/deposit`,
    },
    {
      name: t("Withdraw"),
      url: `/${locale}/player-dashboard/withdraw`,
    },
    {
      name: t("Banking"),
      url: "#",
    },
  ];
};
