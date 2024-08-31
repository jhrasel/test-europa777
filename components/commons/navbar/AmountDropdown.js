import { H6, UILinkBG } from "@/components/UI";
import useBalance from "@/hook/useBalance";
import { Dropdown } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { BsCashCoin } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

export const AmountDropdown = ({ className }) => {
  const balance = useBalance();
  const locale = useLocale();
  const t = useTranslations("playerDashboardPage");
  const menubar = useTranslations("Menubar");

  const items = [
    {
      key: "1",
      label: (
        <div className="flex items-center justify-between gap-2 pb-1 border-b border-gray-400">
          <H6 name={t("Balance")} />
          <H6
            name={`${balance?.total_balance} ${balance?.currency}`}
            className="!font-bold text-red-color"
          />
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex items-center justify-between gap-2 pb-1 border-b border-gray-400">
          <H6 name={t("Withdrawable")} />
          <H6
            name={`${balance?.balance} ${balance?.currency}`}
            className="!font-bold text-red-color"
          />
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className="flex items-center justify-between gap-2 pb-1 border-b border-gray-400">
          <H6 name={t("Lock By Bonus")} />
          <H6
            name={balance?.bonus_balance}
            className="!font-bold text-red-color"
          />
        </div>
      ),
    },

    {
      key: "4",
      label: (
        <UILinkBG
          href={`/${locale}/player-dashboard/deposit`}
          icon={<BsCashCoin />}
          name={`${menubar("Deposit")} Now`}
          className="justify-center line-clamp-1 !text-sm w-full"
        />
      ),
    },
  ];

  return (
    <div className="language__dropdown">
      <Dropdown
        menu={{
          items,
        }}
        placement="bottom"
        arrow
      >
        <div
          className={`flex items-center justify-center cursor-pointer gap-0.5 laptop:gap-1 rounded-full border border-blue-color py-1 laptop:py-1.5 px-2 laptop:px-4 text-blue-color ${className}`}
        >
          {/* <H6 name={balance?.currency} className="!text-xs" /> */}
          <H6
            name={balance?.total_balance}
            className="!text-lg !font-semibold"
          />
          <IoIosArrowDown className="text-base tab:text-lg" />
        </div>
      </Dropdown>
    </div>
  );
};
