import { UIImage } from "@/components/UI";
import { ApplePay } from "./ApplePay";
import { Bitcoin } from "./Bitcoin";
import { BitcoinCash } from "./BitcoinCash";
import { Ethireum } from "./Ethireum";
import { Flexepin } from "./Flexepin";
import { GooglePay } from "./GooglePay";
import { Interac } from "./Interac";
import { LightCoin } from "./LightCoin";
import { MasterCard } from "./MasterCard";
import { VisaCard } from "./VisaCard";

export const DepositData = (country) => {
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
          <div className="flex items-center gap-2">
            <UIImage
              src="/images/bank-img/interac.png"
              className="!w-full !h-auto !object-contain"
            />
            {/* <P name="Interac" className="!text-bg-color2" /> */}
          </div>
        ),
        children: <Interac />,
      },
      {
        key: 2,
        label: (
          <UIImage
            src="/images/bank-img/mastercard.png"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <MasterCard country={country} />,
      },
      {
        key: 3,
        label: (
          <UIImage
            src="/images/bank-img/visa.png"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <VisaCard country={country} />,
      },
      {
        key: 4,
        label: (
          <UIImage
            src="/images/bank-img/g-pay.png"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <GooglePay />,
      },
      {
        key: 5,
        label: (
          <UIImage
            src="/images/bank-img/a-pay.png"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <ApplePay />,
      },
      {
        key: 6,
        label: (
          <UIImage
            src="/images/bank-img/bitcoin.png"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <Bitcoin />,
      },
      {
        key: 7,
        label: (
          <UIImage
            src="/images/bank-img/ethereum.png"
            className="!w-auto !h-full object-contain"
          />
        ),
        children: <Ethireum />,
      },
      {
        key: 8,
        label: (
          <UIImage
            src="/images/bank-img/ltc.png"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <LightCoin />,
      },
      {
        key: 9,
        label: (
          <UIImage
            src="/images/bank-img/bch.png"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <BitcoinCash />,
      },
      {
        key: 10,
        label: (
          <UIImage
            src="/images/bank-img/flexepin.png"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <Flexepin />,
      },
    ];
  } else if (!excludedCountries.includes(country)) {
    return [
      // {
      {
        key: 1,
        label: (
          <UIImage
            src="/images/bank-img/mastercard.png"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <MasterCard country={country} />,
      },
      {
        key: 2,
        label: (
          <UIImage
            src="/images/bank-img/visa.png"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <VisaCard country={country} />,
      },
      {
        key: 3,
        label: (
          <UIImage
            src="/images/bank-img/g-pay.png"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <GooglePay />,
      },
      {
        key: 4,
        label: (
          <UIImage
            src="/images/bank-img/a-pay.png"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <ApplePay />,
      },
      {
        key: 6,
        label: (
          <UIImage
            src="/images/bank-img/bitcoin.png"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <Bitcoin />,
      },
      {
        key: 7,
        label: (
          <UIImage
            src="/images/bank-img/ethereum.png"
            className="!w-auto !h-full object-contain"
          />
        ),
        children: <Ethireum />,
      },
      {
        key: 8,
        label: (
          <UIImage
            src="/images/bank-img/ltc.png"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <LightCoin />,
      },
      {
        key: 9,
        label: (
          <UIImage
            src="/images/bank-img/bch.png"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <BitcoinCash />,
      },
      {
        key: 10,
        label: (
          <UIImage
            src="/images/bank-img/flexepin.png"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <Flexepin />,
      },
    ];
  } else {
    return [
      {
        key: 1,
        label: (
          <UIImage
            src="/images/bank-img/bitcoin.png"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <Bitcoin />,
      },
      {
        key: 2,
        label: (
          <UIImage
            src="/images/bank-img/ethereum.png"
            className="!w-auto !h-full object-contain"
          />
        ),
        children: <Ethireum />,
      },
      {
        key: 3,
        label: (
          <UIImage
            src="/images/bank-img/ltc.png"
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
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <BitcoinCash />,
      },
      {
        key: 5,
        label: (
          <UIImage
            src="/images/bank-img/flexepin.png"
            className="!w-full !h-full !object-contain"
          />
        ),
        children: <Flexepin />,
      },
    ];
  }
};
