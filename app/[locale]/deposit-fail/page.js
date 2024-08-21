import { Container, H2, H4, H5, UILink } from "@/components/UI";
import { useLocale } from "next-intl";

export default function Page() {
  const locale = useLocale();

  return (
    <>
      <Container>
        <div className="text-center">
          <H2 name="DEPOSIT STATUS" className="bg-bg-color3 p-5" />

          <div className="mt-10 inline-flex flex-col gap-5">
            <div className="flex items-center gap-2 justify-center">
              <H4 name="Your deposit was" />
              <H4 name="Fail" className="!text-red-color" />
            </div>
            <H5 name="Please try to deposit again and make sure you entered all details correctly. If the problem persists please contact our support or your bank." />

            <UILink
              href={`/${locale}/player-dashboard/deposit`}
              name="Click here to deposit again"
              className="m-auto !text-red-color"
            />
          </div>
        </div>
      </Container>
    </>
  );
}
