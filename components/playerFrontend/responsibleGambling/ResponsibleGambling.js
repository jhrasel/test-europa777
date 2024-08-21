"use client";

import { H4, P } from "@/components/UI";
import { useLocale, useTranslations } from "next-intl";

export default function ResponsibleGambling() {
  const t = useTranslations("responsibleGambLinkPage");
  const locale = useLocale();
  return (
    <>
      <div className="p-5">
        <div className="rule-header"> {t("responsibleGambLink")} </div>
        <div className="rule-content">
          <P name={t("responsibleGambLine1")} />
          <P name={t("responsibleGambLine2")} />
          <P name={t("responsibleGambLine3")} />
          <P name={t("responsibleGambLine4")} />

          <H4 name={t("responsibleGambLine5")} className="!text-white mt-2" />
          <div className="rule-content">
            <P name={t("responsibleGambLine5")} />
            <P name={t("responsibleGambLine6")} />
            <P name={t("responsibleGambLine7")} />
            <P name={t("responsibleGambLine8")} />
            <P name={t("responsibleGambLine9")} />
            <P name={t("responsibleGambLine10")} />
            <P name={t("responsibleGambLine11")} />
            <P name={t("responsibleGambLine12")} />
            <P name={t("responsibleGambLine13")} />
            <P name={t("responsibleGambLine14")} />
          </div>
        </div>
      </div>
    </>
  );
}
