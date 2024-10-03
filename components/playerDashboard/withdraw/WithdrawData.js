import { UIImage } from "@/components/UI";
import { Bank } from "./Bank";
import { BitCoinCash } from "./BitCoinCash";
import { Inerac } from "./Inerac";
import { LightCoin } from "./LightCoin";
import { USDT } from "./USDT";

export const WithdrawData = (country) => {
  console.log("country", country);

  const excludedCountries = [
    "Afghanistan",
    "Belarus",
    "Bosnia and Herzegovina",
    "Brazil",
    "Burkina Faso",
    "Central African Republic",
    "Congo, the Democratic Republic of the",
    "Cote D'Ivoire",
    "Cuba",
    "Ecuador",
    "Guyana",
    "Haiti",
    "Iran",
    "Iraq",
    "Lao PDR",
    "Mali",
    "Myanmar",
    "North Korea",
    "Russia",
    "Somalia",
    "South Sudan",
    "Sudan",
    "Syria",
    "Tunisia",
    "Uganda",
    "Vanuatu",
    "Venezuela",
    "Yemen",
    "Zimbabwe",
    "United States",
  ];

  if (country === "Canada") {
    return [
      {
        key: 1,
        label: (
          <UIImage
            src="/images/bank-img/interac.png"
            alt="withdraw"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <Inerac />,
      },
      {
        key: 2,
        label: (
          <UIImage
            src="/images/bank-img/usdt.png"
            alt="withdraw"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <USDT />,
      },
      {
        key: 3,
        label: (
          <UIImage
            src="/images/bank-img/ltc.png"
            alt="withdraw"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <LightCoin />,
      },
      {
        key: 4,
        label: (
          <UIImage
            src="/images/bank-img/bch.png"
            alt="withdraw"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <BitCoinCash />,
      },
      {
        key: 5,
        label: (
          <UIImage
            src="/images/bank-img/bank.png"
            alt="withdraw"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <Bank />,
      },
    ];
  } else if (!excludedCountries.includes(country)) {
    return [
      {
        key: 1,
        label: (
          <UIImage
            src="/images/bank-img/usdt.png"
            alt="withdraw"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <USDT />,
      },
      {
        key: 2,
        label: (
          <UIImage
            src="/images/bank-img/ltc.png"
            alt="withdraw"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <LightCoin />,
      },
      {
        key: 3,
        label: (
          <UIImage
            src="/images/bank-img/bch.png"
            alt="withdraw"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <BitCoinCash />,
      },
      {
        key: 4,
        label: (
          <UIImage
            src="/images/bank-img/bank.png"
            alt="withdraw"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <Bank />,
      },
    ];
  } else {
    return [
      {
        key: 1,
        label: (
          <UIImage
            src="/images/bank-img/usdt.png"
            alt="withdraw"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <USDT />,
      },
      {
        key: 2,
        label: (
          <UIImage
            src="/images/bank-img/ltc.png"
            alt="withdraw"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <LightCoin />,
      },
      {
        key: 3,
        label: (
          <UIImage
            src="/images/bank-img/bch.png"
            alt="withdraw"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <BitCoinCash />,
      },
      {
        key: 4,
        label: (
          <UIImage
            src="/images/bank-img/bank.png"
            alt="withdraw"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <Bank />,
      },
    ];
  }
};
