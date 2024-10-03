"use client";

import { Container, P, UILink } from "@/components/UI";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export default function TermsAndCondition() {
  const t = useTranslations("termsAndConditionPage");
  const locale = useLocale();

  return (
    <>
      <Container>
        <div className="p-5">
          <div className="rule-header">{t("termsCondition")}</div>
          <div className="rule-body">
            <div className="rule-label">1. {t("general")}</div>
            <div className="rule-content">
              <P name={t("generalLine1")} />
              <P name={t("generalLine2")} />
              <P name={t("generalLine3")} />
              <P name={t("generalLine4")} />
              <P name={t("generalLine15")} />
            </div>
            <div className="rule-label">2. {t("termsAndCondition")} </div>
            <div className="rule-content">
              <P name={t("termsAndConditionLine1")} />
              <P name={t("termsAndConditionLine2")} />
              <P name={t("termsAndConditionLine3")} />
              <P name={t("termsAndConditionLine4")} />
            </div>
            <div className="rule-label">3. {t("acceptPlayer")}</div>
            <div className="rule-content">
              <P name={t("acceptPlayer1")} />
              <P name={t("acceptPlayer2")} />
              <P name={t("acceptPlayer3")} />
              <P name={t("acceptPlayer4")} />
              <P name={t("acceptPlayer5")} />
            </div>
            <div className="rule-label">4. {t("acceptedCurrencies")}</div>
            <div className="rule-content">
              <P name={t("acceptedCurrenciesLine1")} />
              <P name={t("acceptedCurrenciesLine2")} />
              <P name={t("acceptedCurrenciesLine3")} />
              <P name={t("acceptedCurrenciesLine4")} />
              <P name={t("acceptedCurrenciesLine5")} />
            </div>
            <div className="rule-label">5. {t("fessAndTaxes")}</div>
            <div className="rule-content">
              <P name={t("fessAndTaxesLine")} />
            </div>
            <div className="rule-label">6. {t("availabilityOfGames")}</div>
            <div className="rule-content">
              <P name={t("availabilityOfGamesLine1")} />
              <P name={t("availabilityOfGamesLine2")} />
              <P name={t("availabilityOfGamesLine3")} />
              <P name={t("availabilityOfGamesLine4")} />
              <P name={t("availabilityOfGamesLine5")} />
              <P name={t("availabilityOfGamesLine6")} />
              <P name={t("availabilityOfGamesLine7")} />
              <P name={t("availabilityOfGamesLine8")} />
              <P name={t("availabilityOfGamesLine9")} />
              <P name={t("availabilityOfGamesLine10")} />
              <P name={t("availabilityOfGamesLine11")} />
            </div>
            <div className="rule-label">7. {t("gameRules")} </div>
            <div className="rule-content">
              <P name={t("gameRulesLine")} />
            </div>
            <div className="rule-label">8. {t("disclaimerOfLiabilities")}</div>
            <div className="rule-content">
              <P name={t("disclaimerOfLiabilitiesLine1")} />
              <P name={t("disclaimerOfLiabilitiesLine2")} />
              <P name={t("disclaimerOfLiabilitiesLine3")} />
              <P name={t("disclaimerOfLiabilitiesLine4")} />
              <P name={t("disclaimerOfLiabilitiesLine5")} />
              <P name={t("disclaimerOfLiabilitiesLine6")} />
              <P name={t("disclaimerOfLiabilitiesLine7")} />
              <P name={t("disclaimerOfLiabilitiesLine8")} />
              <P name={t("disclaimerOfLiabilitiesLine9")} />
              <P name={t("disclaimerOfLiabilitiesLine10")} />
              <P name={t("disclaimerOfLiabilitiesLine11")} />
            </div>
            <div className="rule-label">9. {t("useOfPlayerAccount")}</div>
            <div className="rule-content">
              <P name={t("useOfPlayerAccountLine1")} />
              <P name={t("useOfPlayerAccountLine2")} />
              <P name={t("useOfPlayerAccountLine3")} />
              <P name={t("useOfPlayerAccountLine4")} />
              <P name={t("useOfPlayerAccountLine5")} />
              <P name={t("useOfPlayerAccountLine6")} />
              <P name={t("useOfPlayerAccountLine7")} />
              <P name={t("useOfPlayerAccountLine8")} />
              <P name={t("useOfPlayerAccountLine9")} />
              <P name={t("useOfPlayerAccountLine10")} />
              <P name={t("useOfPlayerAccountLine11")} />
              <P name={t("useOfPlayerAccountLine12")} />
            </div>
            <div className="rule-label">10. {t("antiFraudPolicy")} </div>
            <div className="rule-content">
              <P name={t("antiFraudPolicyLine1")} />
              <P name={t("antiFraudPolicyLine2")} />
              <P name={t("antiFraudPolicyLine3")} />
              <P name={t("antiFraudPolicyLine4")} />
              <P name={t("antiFraudPolicyLine5")} />
              <P name={t("antiFraudPolicyLine6")} />
              <P name={t("antiFraudPolicyLine7")} />
              <P name={t("antiFraudPolicyLine8")} />
              <P name={t("antiFraudPolicyLine9")} />
              <P name={t("antiFraudPolicyLine10")} />
              <P name={t("antiFraudPolicyLine11")} />
              <P name={t("antiFraudPolicyLine12")} />
              <P name={t("antiFraudPolicyLine13")} />
              <P name={t("antiFraudPolicyLine14")} />
              <P name={t("antiFraudPolicyLine15")} />
              <P name={t("antiFraudPolicyLine16")} />
              <P name={t("antiFraudPolicyLine17")} />
              <P name={t("antiFraudPolicyLine18")} />
              <P name={t("antiFraudPolicyLine19")} />
              <P name={t("antiFraudPolicyLine20")} />
            </div>
            <div className="rule-label">11. {t("depositing")}</div>
            <div className="rule-content">
              <P name={t("depositingLine1")} />
              <P name={t("depositingLine2")} />
              <P name={t("depositingLine3")} />
              <P name={t("depositingLine4")} />
              <P name={t("depositingLine5")} />
              <P name={t("depositingLine6")} />
              <div className="flex items-center gap-1">
                <P name={t("depositingLine7")} />
                <Link
                  href="https://tawk.to/europa777"
                  target="_blank"
                  className="text-sm laptop:text-base text-blue-color font-normal"
                >
                  {t("depositingLine8")}
                </Link>

                <P name={t("depositingLine9")} />
              </div>
              <P name={t("depositingLine10")} />
              <P name={t("depositingLine11")} />
            </div>
            <div className="rule-label">12. {t("withdrawalPolicy")}</div>
            <div className="rule-content">
              <P name={t("withdrawalPolicyLine1")} />
              <P name={t("withdrawalPolicyLine2")} />
              <P name={t("withdrawalPolicyLine3")} />
              <P name={t("withdrawalPolicyLine4")} />
              <P name={t("withdrawalPolicyLine5")} />
              <P name={t("withdrawalPolicyLine6")} />
              <P name={t("withdrawalPolicyLine7")} />
              <P name={t("withdrawalPolicyLine8")} />
              <P name={t("withdrawalPolicyLine9")} />
              <P name={t("withdrawalPolicyLine10")} />
              <P name={t("withdrawalPolicyLine11")} />
              {/* <P name={t("withdrawalPolicyLine12")} /> */}
            </div>
            <div className="rule-label">13. {t("dormantAccounts")}</div>
            <div className="rule-content">
              <P name={t("dormantAccountsLine1")} />
              <P name={t("dormantAccountsLine2")} />
            </div>
            <div className="rule-label">14. {t("refundPolicy")}</div>
            <div className="rule-content">
              <P name={t("refundPolicyLine1")} />
              <P name={t("refundPolicyLine2")} />
              <P name={t("refundPolicyLine3")} />
              <P name={t("refundPolicyLine4")} />
              <P name={t("refundPolicyLine5")} />
            </div>
            <div className="rule-label">15. {t("expiryPeriod")} </div>
            <div className="rule-content">
              <P name={t("expiryPeriodLine1")} />
            </div>
            <div className="rule-label">16. {t("bonusPolicy")}</div>
            <div className="rule-content">
              <div className="flex items-center gap-2">
                <P name={t("bonusPolicyLine1")} />
                <UILink
                  name={t("bonusTermsPageLink")}
                  href={`/${locale}/bonus-terms/`}
                  className="!text-base !font-normal !text-blue-color"
                />
              </div>

              <P name={t("bonusPolicyLine2")} />
              <P name={t("bonusPolicyLine3")} />
            </div>
            <div className="rule-label">17. {t("playerResponsibility")}</div>
            <div className="rule-content">
              <P name={t("playerResponsibilityLine1")} />
              <P name={t("playerResponsibilityLine2")} />
              <P name={t("playerResponsibilityLine3")} />
              <P name={t("playerResponsibilityLine4")} />
              <P name={t("playerResponsibilityLine5")} />
              <P name={t("playerResponsibilityLine6")} />
              <P name={t("playerResponsibilityLine7")} />
              <P name={t("playerResponsibilityLine8")} />
              <P name={t("playerResponsibilityLine9")} />
              <P name={t("playerResponsibilityLine10")} />
              <P name={t("playerResponsibilityLine11")} />
              <P name={t("playerResponsibilityLine12")} />
              <P name={t("playerResponsibilityLine13")} />
              <P name={t("playerResponsibilityLine14")} />
              <P name={t("playerResponsibilityLine15")} />
            </div>
            <div className="rule-label">18. {t("propertyRights")}</div>
            <div className="rule-content">
              <P name={t("propertyRightsLine1")} />
              <P name={t("propertyRightsLine2")} />
              <P name={t("propertyRightsLine3")} />
            </div>
            <div className="rule-label">19. {t("severability")}</div>
            <div className="rule-content">
              <P name={t("severabilityLine1")} />
            </div>
            <div className="rule-label">20. {t("arbitration")}</div>
            <div className="rule-content">
              <P name={t("arbitrationLine")} />
            </div>
            <div className="rule-label">21. {t("NonTransferability")}</div>
            <div className="rule-content">
              <P name={t("NonTransferabilityLine1")} />
              <P name={t("NonTransferabilityLine2")} />
              <P name={t("NonTransferabilityLine3")} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
