import { Container, H2, UIImage, UILink } from "@/components/UI";
import { useLocale } from "next-intl";

export default function AllProviders({ getAllGameProvidersData }) {
  const locale = useLocale();

  const getData = getAllGameProvidersData.data;

  return (
    <>
      <section>
        <Container>
          <H2
            name="All Provider"
            className="text-center bg-bg-color2 py-3 tab:py-5 mt-3"
          />

          <div className="grid grid-cols-2 tab:grid-cols-4 laptop:grid-cols-8 gap-2 tab:gap-5 mt-5">
            {getData?.map((gameProvider) => (
              <div
                className="rounded-lg bg-bg-color1 p-2 text-center"
                key={gameProvider.id}
              >
                <UILink
                  href={`/${locale}/provider-games/${gameProvider.name}`}
                  className="w-full !flex-col !line-clamp-1 justify-center"
                  icon={
                    <UIImage
                      src={gameProvider.logo || "/images/default-cart.jpg"}
                      alt={gameProvider.name}
                      className="!w-full !h-14 object-contain rounded-lg transition duration-150 hover:-translate-y-1 mb-2 border-b border-bg-color3"
                    />
                  }
                  name={gameProvider.name}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
