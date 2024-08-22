"use client";
import { Container, H3, HeaderTitle, UIImage, UILink } from "@/components/UI";
import { useLocale, useTranslations } from "next-intl";

export const AllProviders = ({ gethHomePageGames }) => {
  const getData = gethHomePageGames.data.gameProviders;

  const t = useTranslations("HomePage");
  const locale = useLocale();

  return (
    <>
      <section className="pt-5">
        <Container>
          <div className="bg-bg-color2 p-5 rounded-lg">
            <HeaderTitle title={t("All Providers")} href="all-providers" />

            <div className="grid grid-cols-2 tab:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-6 gap-5">
              {getData.length === 0 ? (
                <H3 name="No data found" className="text-center col-span-12" />
              ) : (
                getData?.map((gameProvider) => (
                  <div
                    className="rounded-lg border border-bg-color3 p-2"
                    key={gameProvider.id}
                  >
                    <UILink
                      href={`/${locale}/provider-games/${gameProvider.name}`}
                      className="w-full !flex-col"
                      icon={
                        <UIImage
                          src={gameProvider.logo || "/images/default-cart.jpg"}
                          alt={gameProvider.name}
                          className="!w-full !h-20 object-contain rounded-lg transition duration-150 hover:-translate-y-1 mb-2 border-b border-bg-color3"
                        />
                      }
                      name={gameProvider.name}
                    />
                  </div>
                ))
              )}
            </div>
            {/* <div className="text-center mt-5">
              <UIButton name="Load More" className="bg-blue-color" />
            </div> */}
          </div>
        </Container>
      </section>
    </>
  );
};
