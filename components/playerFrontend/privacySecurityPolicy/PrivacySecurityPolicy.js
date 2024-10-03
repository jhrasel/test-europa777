"use client";

import { Container, P } from "@/components/UI";
import { useLocale, useTranslations } from "next-intl";

export default function PrivacySecurityPolicy() {
  const t = useTranslations("privacyAndSecurityPolicyPage");
  const locale = useLocale();

  return (
    <>
      <Container>
        <div className="p-5">
          <div className="rule-header">{t("privacyAndSecurityPolicy")}</div>
          <div className="rule-body">
            <div className="rule-label">{t("privacyPolicy")}</div>
            <div className="rule-content">
              <P name={t("privacyPolicyLine")} />
            </div>
            <div className="rule-label">1. {t("informationGathered")}</div>
            <div className="rule-content">
              <P name={t("informationGatheredLine1")} />
              <P name={t("informationGatheredLine12")} />
            </div>
            <div className="rule-label">2. {t("protectionOfInformation")} </div>
            <div className="rule-content">
              <P name={t("protectionOfInformationLine1")} />
              <P name={t("protectionOfInformationLine2")} />
              <P name={t("protectionOfInformationLine3")} />
              <P name={t("protectionOfInformationLine4")} />
              <P name={t("protectionOfInformationLine5")} />
            </div>
            <div className="rule-label">3. {t("useOfInformation")} </div>
            <div className="rule-content">
              <P name={t("useOfInformationLine1")} />
              <P name={t("useOfInformationLine2")} />
            </div>
            <div className="rule-label">4. {t("cookies")} </div>
            <div className="rule-content">
              <P name={t("cookiesLine")} />
            </div>
            <div className="rule-label">5. {t("canSpamAct")} </div>
            <div className="rule-content">
              <P name={t("canSpamActLine1")} />
              <P name={t("canSpamActLine2")} />
              <P name={t("canSpamActLine3")} />
              <P name={t("canSpamActLine4")} />
              <P name={t("canSpamActLine5")} />
              <P name={t("canSpamActLine6")} />
              <P name={t("canSpamActLine7")} />
              <P name={t("canSpamActLine8")} />
            </div>
            <div className="rule-label">6. {t("securityPolicy")} </div>
            <div className="rule-content">
              <P name={t("securityPolicyLine1")} />
              <P name={t("securityPolicyLine2")} />
              <P name={t("securityPolicyLine3")} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
