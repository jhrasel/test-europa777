import { useTranslations } from "next-intl";
import { Container } from "../UI";

export default function AboutUs() {
  const t = useTranslations("aboutPage");
  return (
    <>
      <Container>
        <div className="rule-header">{t("title")}</div>
        <div className="rule-content">
          <p>{t("des1")}</p>
          <p>{t("des2")}</p>
          <p>{t("des3")}</p>
          <p>{t("des4")}</p>
          <p>{t("des5")}</p>
          <p>{t("des6")}</p>
          <p>{t("des7")}</p>
          <p>{t("des8")}</p>
        </div>
      </Container>
    </>
  );
}
