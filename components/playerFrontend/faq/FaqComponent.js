import { Container } from "@/components/UI";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function FaqComponent() {
  const t = useTranslations("faqPage");

  return (
    <>
      <Container>
      <div className="rule-header">{t("faqTitle")}</div>
      <div className="rule-body">
        <div className="rule-label">{t("faqTitle1")}</div>
        <div className="rule-content">
          <p className="flex items-center gap-1">
            {t("faqDes1")}
            <Link style={{ color: "blueviolet" }} href="/about-us">
              {t("faqAbout")}
            </Link>
          </p>
        </div>
        <div className="rule-label"> {t("faqTitle2")}</div>
        <div className="rule-content">
          <p>{t("faqDes2")}</p>
        </div>
        <div className="rule-label">{t("faqTitle3")}</div>
        <div className="rule-content">
          <p>{t("faqDes3")}</p>
        </div>
        <div className="rule-label">{t("faqTitle4")}</div>
        <div className="rule-content">
          <p>{t("faqDes4")}</p>
        </div>
        <div className="rule-label">{t("faqTitle5")}</div>
        <div className="rule-content">
          <p>{t("faqDes5")}</p>
          <p>{t("faqDes5One")}</p>
          <p>{t("faqDes5Two")}</p>
          <p>{t("faqDes5Three")}</p>
          <p>{t("faqDes5Four")}</p>
        </div>
        <div className="rule-label">{t("faqTitle6")}</div>
        <div className="rule-content">
          <p>
            {t("faqDes6")}
            <Link style={{ color: "blueviolet" }} href="#">
              {t("faqDes6Promotions")}
            </Link>
            {t("faqDes6One")}
            <Link style={{ color: "blueviolet" }} href="bonus-terms">
              {t("faqDes6BonusTerms")}
            </Link>
            {t("faqDes6Two")}
          </p>
        </div>
        <div className="rule-label">{t("faqTitle7")}</div>
        <div className="rule-content">
          <p>{t("faqDes7")}</p>
        </div>
        <div className="rule-label">{t("faqTitle8")}</div>
        <div className="rule-content">
          <p>{t("faqDes8")}</p>
        </div>
        <div className="rule-label">{t("faqTitle9")}</div>
        <div className="rule-content">
          <p>{t("faqDes9")}</p>
          <p>{t("faqDes9One")}</p>
        </div>
        <div className="rule-label">{t("faqTitle10")}</div>
        <div className="rule-content">
          <p>{t("faqDes10")}</p>
        </div>
        <div className="rule-label">{t("faqTitle11")}</div>
        <div className="rule-content">
          <p className="">
            {t("faqDes11")}
            <Link style={{ color: "blueviolet" }} href="deposit">
              {t("faqDesPayments")}
            </Link>
            {t("faqDesPage")}
          </p>
        </div>
      </div>
      </Container>
    </>
  );
}
