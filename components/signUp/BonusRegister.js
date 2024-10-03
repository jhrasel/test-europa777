import useApi from "@/helpers/apiRequest";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import bonusRegister from "../../public/images/Bonus-Registration-popup.png";
import bonusCard1 from "../../public/images/bonus-card-1.png";
import bonusCard2 from "../../public/images/bonus-card-2.png";
import bonusCard3 from "../../public/images/bonus-card-3.png";
import { H2, H3, H5 } from "../UI";

export default function BonusRegister({
  goToStep2,
  isOpen,
  setIsOpen,
  onCancel,
  onSelect,
}) {
  const { fetchData } = useApi();
  const [selectedOption, setSelectedOption] = useState("BONUS1");
  const [promoCode, setPromoCode] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const showModal = () => {
    router.push(pathname + "?" + createQueryString("modal", "sign-in"));
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };

  const handleOptionSelect = async () => {
    let promo_code = null;

    // Validate promo code input if necessary
    if (selectedOption === "promoCode" && !promoCode) {
      toast.error("Please enter a promo code.");
      return;
    }

    // Set promo code based on selection
    if (selectedOption === "BONUS1") {
      promo_code = "BONUS1";
    } else if (selectedOption === "promoCode") {
      promo_code = promoCode;
    } else if (selectedOption === "freeSpinNo") {
      promo_code = null;
      onSelect({ option: selectedOption, promo_code });
      goToStep2();
      return;
    }

    // Fetch data (optional, based on your logic)
    const result = await fetchData("/validatePromoCode", "POST", {
      promo_code,
    });

    if (result.status === 200) {
      // Pass the selected option and promo code to the parent or next page
      onSelect({ option: selectedOption, promo_code });

      goToStep2();
      setIsOpen(false);
    } else {
      toast.error(
        "Invalid promo code. Please check it or choose another bonus option."
      );
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-[9999] bg-[#0000008f]">
          <div className="relative">
            {/* close icon */}
            <button
              onClick={onCancel}
              className="absolute top-0 right-0 text-4xl text-red-color z-[99]"
            >
              <AiOutlineClose />
            </button>

            <Image src={bonusRegister} alt="bonus" />

            {/* welcome */}
            <div className="absolute top-2 tab:top-3 left-1/2 -translate-x-1/2 text-center w-[500px]">
              <H3
                name="CHOOSE YOUR"
                className="!text-white !text-2xl tab:!text-3xl !font-bold"
              />
              <H2
                name="WELCOME BONUS"
                className="!text-white !text-2xl tab:!text-[35px] tab:mt-1 !font-extrabold"
              />
            </div>

            {/* login */}
            <div className="w-[90%] tab:w-[450px] absolute top-[100px] tab:top-[130px] left-1/2 -translate-x-1/2 z-10">
              <div onClick={showModal} className="flex justify-center mt-1">
                <h3 className="cursor-pointer text-bg-color1 flex items-center gap-2 text-base tab:text-lg">
                  Already have an account?
                  <span className="text-blue-color font-bold">Sign In</span>
                </h3>
              </div>
            </div>

            {/* card options */}
            <div className="w-[95%] tab:w-[470px] p-[20px] tab:p-[30px] absolute top-[130px] tab:top-[160px] left-1/2 -translate-x-1/2">
              <ul className="flex flex-col gap-5">
                {/* Free Spin option */}
                <li className="relative">
                  <label htmlFor="BONUS1" className="cursor-pointer">
                    <Image src={bonusCard1} alt="bonus" className="w-full" />
                    <div className="absolute top-1/2 -translate-y-1/2 pl-[90px] tab:pl-[112px] pr-[50px] tab:pr-[58px]">
                      <H5
                        name="200% up to 1000.00 + 100 free spins"
                        className="!text-bg-color1 !font-bold !text-base tab:!text-[22px]"
                      />
                    </div>
                    <input
                      type="radio"
                      id="BONUS1"
                      name="check"
                      className="absolute top-1/2 -translate-y-1/2 right-3 w-7 tab:w-9 h-7 tab:h-9 appearance-none checked:bg-blue-color rounded-full border border-gray-300"
                      onChange={() => handleOptionChange("BONUS1")}
                      checked={selectedOption === "BONUS1"}
                    />
                  </label>
                </li>

                {/* Promo Code option */}
                <li className="relative">
                  <label htmlFor="promoCode" className="cursor-pointer">
                    <Image src={bonusCard2} alt="bonus" className="w-full" />
                    <div className="absolute top-1/2 -translate-y-1/2 pl-[90px] tab:pl-[112px] pr-[50px] tab:pr-[58px]">
                      <H5
                        name="I have a promo code"
                        className="!text-bg-color1 !font-bold !text-base tab:!text-[22px]"
                      />
                      {selectedOption === "promoCode" && (
                        <>
                          <input
                            type="text"
                            className={`w-full py-1.5 px-2 !border !border-border-color rounded-md tab:mt-2 text-xs tab:text-base`}
                            placeholder="Enter your promo code"
                            value={promoCode}
                            onChange={handlePromoCodeChange}
                          />
                        </>
                      )}
                    </div>
                    <input
                      type="radio"
                      id="promoCode"
                      name="check"
                      className="absolute top-1/2 -translate-y-1/2 right-3 w-7 tab:w-9 h-7 tab:h-9 appearance-none checked:bg-blue-color rounded-full border border-gray-300"
                      onChange={() => {
                        handleOptionChange("promoCode");
                      }}
                      checked={selectedOption === "promoCode"}
                    />
                  </label>
                </li>

                {/* No Bonus option */}
                <li className="relative">
                  <label htmlFor="freeSpinNo" className="cursor-pointer">
                    <Image src={bonusCard3} alt="bonus" className="w-full" />
                    <div className="absolute top-1/2 -translate-y-1/2 pl-[90px] tab:pl-[112px] pr-[50px] tab:pr-[58px]">
                      <H5
                        name="I do not want a bonus"
                        className="!text-bg-color1 !font-bold !text-base tab:!text-[22px]"
                      />
                    </div>
                    <input
                      type="radio"
                      id="freeSpinNo"
                      name="check"
                      className="absolute top-1/2 -translate-y-1/2 right-3 w-7 tab:w-9 h-7 tab:h-9 appearance-none checked:bg-blue-color rounded-full border border-gray-300"
                      onChange={() => handleOptionChange("freeSpinNo")}
                      checked={selectedOption === "freeSpinNo"}
                    />
                  </label>
                </li>
              </ul>
            </div>

            {/* Choose button */}
            <div className="absolute bottom-[22px] tab:bottom-[30px] left-1/2 -translate-x-1/2 text-center z-10 cursor-pointer w-[230px] tab:w-[285px] h-[75px] tab:h-[95px] rounded-full flex items-center justify-center">
              <button
                onClick={handleOptionSelect}
                className="!text-white !text-3xl tab:!text-5xl !font-bold"
              >
                Choose
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
