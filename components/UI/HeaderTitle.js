import { useTranslations } from "next-intl";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { UIImage } from "./Image";
import { UILink } from "./Link";
import { H2 } from "./Tags";

export const HeaderTitle = ({
  image,
  icon,
  title,
  href,
  onPrev,
  onNext,
  swiperArrow = false,
}) => {
  const t = useTranslations("Common");
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        {/* left */}
        <div className="flex items-center gap-2 tab:gap-3">
          {image && (
            <UIImage
              src={image}
              alt="header"
              className="!w-[30px] laptop:!w-[35px] h-[30px] laptop:h-[35px]"
            />
          )}

          {icon && (
            <span className="text-white text-2xl tab:text-3xl">{icon}</span>
          )}

          <H2 name={title} />
        </div>
        {/* right */}
        <div className="flex items-center gap-1 tab:gap-3">
          {href && (
            <UILink
              href={href}
              name={t("View All")}
              className="bg-bg-color3 py-1.5 px-2 tab:px-5 rounded-md !text-xs tab:!text-sm !font-semibold ease-in-out duration-100 hover:bg-hover-color"
            />
          )}
          {/* prev next */}
          {swiperArrow && (
            <div className="flex items-center gap-1 tab:gap-2">
              <div
                onClick={onPrev}
                className="prev w-7 tab:w-8 h-7 tab:h-8 bg-bg-color2 text-white rounded flex items-center justify-center cursor-pointer hover:bg-bg-color1"
              >
                <IoIosArrowBack />
              </div>

              <div
                onClick={onNext}
                className="next w-7 tab:w-8 h-7 tab:h-8 bg-bg-color2 text-white rounded flex items-center justify-center cursor-pointer hover:bg-bg-color1"
              >
                <IoIosArrowForward />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
