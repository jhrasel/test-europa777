import useBalance from "@/hook/useBalance";
import { useLocale, useTranslations } from "next-intl";

export function AfterLogin({
  showSidebar,
  showSidebarMobile,
  closeMobileSidebar,
}) {
  const t = useTranslations("Menubar");
  const locale = useLocale();
  const balance = useBalance();
  const handleMenuItemClick = () => {
    closeMobileSidebar();
  };
  return (
    <>
      <div className="flex justify-center laptop:flex-col gap-2">
        {/* <div className="flex flex-col items-center justify-center gap-1">
          <H3 name="Balance" className="!text-lg" />
          <div className="flex items-center justify-center gap-1">
            <H3 name={balance?.currency} className="!text-base" />
            <H3 name={balance?.balance} className="!text-base" />
          </div>
        </div> */}

        {/* <UILinkBG
          href={`/${locale}/player-dashboard/deposit`}
          icon={<BsCashCoin />}
          name={t("Deposit")}
          className="justify-center line-clamp-1 !text-sm"
          onClick={handleMenuItemClick}
        />
        <UILink
          onClick={handleMenuItemClick}
          href={`/${locale}/player-dashboard/profile`}
          icon={<CgProfile />}
          name={t("Account")}
          className="!text-sm border border-blue-color py-1 laptop:py-1.5 px-4 tab:px-5 laptop:px-8 rounded-full justify-center hover:bg-blue-color hover:text-white line-clamp-1"
        /> */}
      </div>
    </>
  );
}
