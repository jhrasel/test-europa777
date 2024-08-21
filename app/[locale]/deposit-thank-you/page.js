import { Container, H2, H4, H5, UILinkBG } from "@/components/UI";
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
              <H4 name="Successful" className="!text-blue-color" />
            </div>
            <H5 name="Funds have been added in your wallet and you're ready to play." />

            <UILinkBG
              href={`/${locale}/slot`}
              name="START PLAYING"
              className="m-auto"
            />
          </div>
        </div>
      </Container>
    </>
  );
}
