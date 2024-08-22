import { UIImage } from "@/components/UI";
import { Bank } from "./Bank";
import { BitCoinCash } from "./BitCoinCash";
import { Inerac } from "./Inerac";
import { LightCoin } from "./LightCoin";
import { USDT } from "./USDT";

export const WithdrawData = [
  {
    key: 1,
    label: (
      <UIImage
        src="/images/bank-img/interac.png"
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
    children: <BitCoinCash />,
  },
  {
    key: 5,
    label: (
      <UIImage
        src="/images/bank-img/bank.png"
        className="!w-full !h-full !object-contain"
      />
    ),
    children: <Bank />,
  },

  // {
  //     key: 3,
  //     label: (
  //       <div className="flex items-center gap-2">
  //         <UIImage
  //           src="/images/bank-img/bitcoin.png"
  //           className="!w-full !h-full !object-contain"
  //         />
  //       </div>
  //     ),
  //     children: <BitCoin />,
  //   },
];
