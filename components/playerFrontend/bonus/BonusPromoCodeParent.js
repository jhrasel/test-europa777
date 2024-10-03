import useApi from "@/helpers/apiRequest";
import { useLocale } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";
import { Bonus } from "./Bonus";
import PromoCodeComponent from "@/components/playerDashboard/deposit/PromoCodeInput";

export default function BonusPromoCodeParent() {
  const { fetchData } = useApi();
  const locale = useLocale();
  const [promoCode, setPromoCode] = useState("");

  const validatePromoCode = async (code) => {
    const { data, error } = await fetchData("/player/addPromoCode", "POST", {
      code: code,
    });

    if (data?.success) {
      toast.success(data.message);
    } else if (data) {
      toast.error(data.message);
    } else if (error) {
      toast.error(error.message);
    }
  };

  const handleClaimBonus = (promoCode) => {
    // Your handleClaimBonus logic here
    validatePromoCode(promoCode); // Call the function here
  };

  return (
    <>
      {" "}
      <Bonus validatePromoCode={validatePromoCode} />
      <PromoCodeComponent
        initialPromoCode={promoCode}
        onPromoCodeChange={(code) => setPromoCode(code)}
      />
    </>
  );
}
