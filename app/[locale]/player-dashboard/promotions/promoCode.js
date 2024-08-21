import PromoCodeInput from "@/deposit/PromoCodeInput";

export default function PromoCode() {
  const [promoCode, setPromoCode] = useState("");

  return (
    <>
      <PromoCodeInput
        className="!border-none m-auto"
        initialPromoCode={promoCode}
        onPromoCodeChange={handlePromoCodeChange}
      />
    </>
  );
}
