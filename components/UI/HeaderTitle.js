import { useTranslations } from "next-intl";
import { UIImage } from "./Image";
import { UILink } from "./Link";
import { H2 } from "./Tags";

export const HeaderTitle = ({ image, icon, title, href }) => {
  const t = useTranslations("Common");
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        {/* left */}
        <div className="flex items-center gap-3">
          {image && (
            <UIImage
              src={image}
              alt="header"
              className="!w-[30px] laptop:!w-[35px] h-[30px] laptop:h-[35px]"
            />
          )}

          {icon && <span className="text-white text-2xl tab:text-3xl">{icon}</span>}

          <H2 name={title} />
        </div>
        {/* right */}
        {href && (
          <div className="">
            <UILink
              href={href}
              name={t("View All")}
              className="bg-bg-color3 py-2 px-5 rounded-md !font-semibold ease-in-out duration-100 hover:bg-hover-color"
            />
          </div>
        )}
      </div>
    </>
  );
};
