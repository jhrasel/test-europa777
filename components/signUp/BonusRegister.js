import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import bonusRegister from "../../public/images/Bonus-Registration-popup.png";
import bonusCard1 from "../../public/images/bonus-card-1.png";
import bonusCard2 from "../../public/images/bonus-card-2.png";
import bonusCard3 from "../../public/images/bonus-card-3.png";
import { H2, H3, H5 } from "../UI";

export default function BonusRegister({ goToStep2, isOpen, setIsOpen }) {
  const t = useTranslations("Common");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedOption, setSelectedOption] = useState("freeSpin");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleOptionSelect = () => {
    goToStep2();
    setIsOpen(false);
  };

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const showSignInModal = () => {
    setIsOpen(false);
    router.push(pathname + "?" + createQueryString("modal", "sign-in"));
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-[9999] bg-[#00000070]">
          <div className="relative">
            <Image src={bonusRegister} alt="bonus" />

            {/* welcome */}
            <div className="absolute top-2 tab:top-5 left-1/2 -translate-x-1/2 text-center w-[500px]">
              <H3
                name="CHOOSE YOUR"
                className="!text-white !text-2xl tab:!text-4xl !font-bold"
              />
              <H2
                name="WELCOME BONUS"
                className="!text-white !text-2xl tab:!text-[40px] tab:mt-2 !font-extrabold"
              />
            </div>

            {/* login */}
            <div className="w-[90%] tab:w-[560px] absolute top-[100px] tab:top-[170px] left-1/2 -translate-x-1/2 z-10">
              <div
                onClick={showSignInModal}
                className="flex justify-center mt-1"
              >
                <h3 className="cursor-pointer text-bg-color1 flex items-center gap-2 text-base tab:text-lg">
                  Already have an account?
                  <span className="text-blue-color font-bold">
                    {t("Sign In")}
                  </span>
                </h3>
              </div>
            </div>

            {/* card */}
            <div className="w-[95%] tab:w-[560px] p-[20px] tab:p-[45px] absolute top-[130px] tab:top-[200px] left-1/2 -translate-x-1/2">
              <ul className="flex flex-col gap-5 tab:gap-8">
                <li className="relative">
                  <label htmlFor="freeSpin" className="cursor-pointer">
                    <Image src={bonusCard1} alt="bonus" className="w-full" />

                    <div className="absolute top-1/2 -translate-y-1/2 pl-[90px] tab:pl-36 pr-[50px] tab:pr-16">
                      <H5
                        name="200% up to 1000.00 + 100 free spins"
                        className="!text-bg-color1 !font-bold !text-base tab:!text-2xl"
                      />
                    </div>
                    <input
                      type="radio"
                      id="freeSpin"
                      name="check"
                      className="absolute top-1/2 -translate-y-1/2 right-3 w-7 tab:w-10 h-7 tab:h-10 appearance-none checked:bg-blue-color checked:border-transparent rounded-full border border-gray-300"
                      onChange={() => handleOptionChange("freeSpin")}
                      checked={selectedOption === "freeSpin"}
                    />
                  </label>
                </li>
                <li className="relative">
                  <label htmlFor="promoCode" className="cursor-pointer">
                    <Image src={bonusCard2} alt="bonus" className="w-full" />

                    <div className="absolute top-1/2 -translate-y-1/2 pl-[90px] tab:pl-36 pr-[50px] tab:pr-16">
                      <H5
                        name="I have a promo code"
                        className="!text-bg-color1 !font-bold !text-base tab:!text-2xl"
                      />
                      {selectedOption === "promoCode" && (
                        <input
                          type="text"
                          className="w-full py-1.5 px-2 !border !border-border-color rounded-md tab:mt-2 text-xs tab:text-base"
                          placeholder="Enter your promo code"
                        />
                      )}
                    </div>
                    <input
                      type="radio"
                      id="promoCode"
                      name="check"
                      className="absolute top-1/2 -translate-y-1/2 right-3 w-7 tab:w-10 h-7 tab:h-10 appearance-none checked:bg-blue-color checked:border-transparent rounded-full border border-gray-300"
                      onChange={() => handleOptionChange("promoCode")}
                      checked={selectedOption === "promoCode"}
                    />
                  </label>
                </li>
                <li className="relative">
                  <label htmlFor="freeSpinNo" className="cursor-pointer">
                    <Image src={bonusCard3} alt="bonus" className="w-full" />

                    <div className="absolute top-1/2 -translate-y-1/2 pl-[90px] tab:pl-36 pr-[50px] tab:pr-16">
                      <H5
                        name="I do not want a bonus"
                        className="!text-bg-color1 !font-bold !text-base tab:!text-2xl"
                      />
                    </div>
                    <input
                      type="radio"
                      id="freeSpinNo"
                      name="check"
                      className="absolute top-1/2 -translate-y-1/2 right-3 w-7 tab:w-10 h-7 tab:h-10 appearance-none checked:bg-blue-color checked:border-transparent rounded-full border border-gray-300"
                      onChange={() => handleOptionChange("freeSpinNo")}
                      checked={selectedOption === "freeSpinNo"}
                    />
                  </label>
                </li>
              </ul>
            </div>

            {/* choose */}
            <div className="absolute bottom-[22px] tab:bottom-[35px] left-1/2 -translate-x-1/2 text-center z-10 cursor-pointer w-[230px] tab:w-[350px] h-[75px] tab:h-[120px] rounded-full flex items-center justify-center">
              <button
                onClick={handleOptionSelect}
                className="!text-white !text-4xl tab:!text-6xl !font-bold "
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
