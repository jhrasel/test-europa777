"use client";

import { useLoading } from "@/context/LoadingContext";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoMdCopy } from "react-icons/io";
import { Container, H2, H3, H4, H5, H6, P, UIImage, UILink } from "../../UI";
import Modal from "./Modal";

export const Bonus = ({ getBonusData }) => {
  const getData = getBonusData.data;

  const { loading } = useLoading();
  const router = useRouter();
  const t = useTranslations("Common");
  const pro = useTranslations("Menubar");
  const locale = useLocale();
  // const [promotions, setPromotions] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  // Uncomment the copyToClipboard function
  const copyToClipboard = (promoCode) => {
    navigator.clipboard.writeText(promoCode).then(() => {
      toast("Promo code copied to clipboard");
    });
  };

  const handleClaimBonus = (promoCode) => {
    copyToClipboard(promoCode);
    // Pass the promo code to the PromoCodeComponent
    setSelectedPromotion(promoCode);

    // Redirect to the deposit page
    router.push(`/${locale}/player-dashboard/deposit?promo=${promoCode}`);
  };

  const handleReadMore = (promotion) => {
    setSelectedPromotion(promotion);
  };

  const closeModal = () => {
    setSelectedPromotion(null);
  };

  return (
    <>
      <section>
        <Container>
          <div className="flex items-start gap-2 mb-5 mt-2 justify-center">
            <H4 name=" Do you have promo code ?" className="!text-white" />
            <UILink
              href={`/${locale}/player-dashboard/deposit/`}
              name="Yes"
              className="!text-xl tab:!text-2xl !font-bold !text-blue-color"
            />
          </div>

          <div className="text-center py-5 bg-bg-color2">
            <H2 name={pro("Promotions")} className="" />
          </div>

          <div className="mt-10 grid tab:grid-cols-2 gap-8">
            {getData.map((data) => (
              <div className="bg-bg-color2 rounded-3xl" key={data?.name}>
                <UIImage
                  src={data.image || "/images/default-cart.jpg"}
                  alt={data.name}
                  className="rounded-3xl !w-full object-cover"
                />
                <div className="p-5 flex flex-col gap-1.5">
                  <H3 name={data?.name} />
                  <div className="flex items-center gap-2">
                    <H5 name={`Use the code`} className="!text-white" />
                    <H5
                      name={`${data?.promo_code}`}
                      className="!text-blue-color"
                    />

                    <button
                      onClick={() => copyToClipboard(data?.promo_code)}
                      className="text-2xl text-blue-color"
                    >
                      <IoMdCopy />
                    </button>
                  </div>
                  <H6
                    name={`Expire code ${data.end_at}`}
                    className="!text-white"
                  />
                  <P name={data?.description} className="line-clamp-2" />

                  <div className="grid grid-cols-1 tab:grid-cols-2 gap-5 mt-5 tab:w-[90%] laptop:w-[80%] m-auto">
                    <div
                      className="font-medium text-lg text-white cursor-pointer border border-white text-center p-2 rounded-lg"
                      onClick={() => handleReadMore(data)}
                    >
                      {t("Read More")}
                    </div>

                    <button
                      onClick={() => handleClaimBonus(data?.promo_code)}
                      className="text-lg border border-blue-color text-center p-2 rounded-lg font-bold bg-[linear-gradient(1deg,_#0242c0_0%,_#0e5efd_100%)] text-white"
                    >
                      Claim Bonus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Modal show={!!selectedPromotion} onClose={closeModal}>
        <div className="flex flex-col gap-2 mt-5">
          <H3 name={selectedPromotion?.name} className=" !text-white" />

          <div className="flex items-center gap-2">
            <H4 name={`Use the code`} className="" />
            <H4
              name={`${selectedPromotion?.promo_code}`}
              className="!text-blue-color"
            />
            <button
              onClick={() => copyToClipboard(selectedPromotion?.promo_code)}
              className="text-2xl text-blue-color"
            >
              <IoMdCopy />
            </button>
          </div>

          <H5
            name={`Expire code ${selectedPromotion?.end_at}`}
            className="!text-white"
          />

          <H5 name={selectedPromotion?.description} />
        </div>
      </Modal>
    </>
  );
};
