import { H5 } from "@/components/UI";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import useBalance from "@/hook/useBalance";
import { useTranslations } from "next-intl";

export default function ShowBalance() {
  const balance = useBalance();
  const t = useTranslations("playerDashboardPage");

  if (balance === null) {
    return <CustomSkeleton hasImage={false} hasText={true} />;
  }
  return (
    <>
      <div className="">
        <div className="flex items-center justify-between gap-3 mb-2">
          <H5 name={t("Balance")} className="!text-red-color !text-sm" />
          <H5
            name={`${balance.balance} ${balance.currency}`}
            className="!font-bold !text-red-color !text-sm"
          />
        </div>
        <div className="flex items-center justify-between gap-3 mb-2">
          <H5 name={t("Withdrawable")} className="!text-sm" />
          <H5
            name={`${balance.balance} ${balance.currency}`}
            className="!font-bold !text-sm"
          />
        </div>
        {/* item */}
        <div className="flex items-center justify-between gap-3 mb-2">
          <H5 name={t("Lock By Bonus")} className="!text-sm" />
          <H5
            name={`${balance.bonus_balance}  ${balance.currency}`}
            className="!font-bold !text-sm"
          />
        </div>
      </div>
    </>
  );
}
