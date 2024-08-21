import { useTranslations } from "next-intl";
import { Container, H2, UIImage } from "../UI";
import { ForgetForm } from "./ForgetForm";

export default function ForgetPassword() {
  const t = useTranslations("Common");
  return (
    <>
      <section className="mt-5">
        <Container>
          <div className="p-5 w-[90%] tab:w-[500px] m-auto bg-white">
            <div className="mb-4 bg-bg-color1 py-2 rounded-lg">
              <UIImage
                src="/images/logo.png"
                alt="logo"
                className="!w-auto h-6 laptop:h-8 m-auto"
              />
            </div>
            <H2
              name={t("Reset Password")}
              className="!text-bg-color1 text-center"
            />

            {/* ForgetPassword */}
            <div className="mt-4">
              <ForgetForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
