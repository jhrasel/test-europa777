import { useTranslations } from "next-intl";

export const VipData = () => {
  const t = useTranslations("VipPage");

  return [
    {
      id: 1,
      image: "/images/vip/vip1.png",
      title: `${t("level")} 1`,
      compPoint: "0-499",
      dailyPoint: "8%",
      weeklyPoint: "3%",
      wager: "X35",
      titleBg:
        "linear-gradient(270deg,#1a0f00 0,#9e7c39 38%,#9e7c39 63%,#1a0f00)",
      cardBg: "linear-gradient(180deg,rgba(0,0,0,.8) 26%,rgba(158,124,57,.8))",
    },

    {
      id: 2,
      image: "/images/vip/vip2.png",
      title: `${t("level")} 2`,
      dailyPoint: "10%",
      compPoint: "500",
      weeklyPoint: "5%",
      wager: "X35",
      titleBg:
        "linear-gradient(270deg,#0a0400 0,#9d642f 36%,#9d642f 66%,#0a0400)",
      cardBg: "linear-gradient(180deg,rgba(0,0,0,.8) 26%,rgba(157,100,47,.8))",
    },
    {
      id: 3,
      image: "/images/vip/vip3.png",
      title: `${t("level")} 3`,
      dailyPoint: "11%",
      compPoint: "1000",
      weeklyPoint: "6%",
      wager: "X35",
      titleBg:
        "linear-gradient(270deg,#0a0a0a 0,#6d6a6b 30%,#989898 53%,#6c6c6c 73%,#0a0a0a)",
      cardBg: "linear-gradient(180deg,rgba(0,0,0,.8) 26%,rgba(90,90,90,.8))",
    },
    {
      id: 4,
      image: "/images/vip/vip4.png",
      title: `${t("level")} 4`,
      dailyPoint: "13%",
      compPoint: "2000",
      weeklyPoint: "7%",
      wager: "X35",
      titleBg:
        "linear-gradient(270deg,#1a0f00 0,#9e7c39 38%,#9e7c39 63%,#1a0f00)",
      cardBg: "linear-gradient(180deg,rgba(0,0,0,.8) 26%,rgba(158,124,57,.8))",
    },
    {
      id: 5,
      image: "/images/vip/vip5.png",
      title: `${t("level")} 5`,
      dailyPoint: "15%",
      compPoint: "4000",
      weeklyPoint: "8%",
      wager: "X35",
      titleBg:
        "linear-gradient(270deg,#060000 0,#45a29e 35%,#45a29e 67%,#060000)",
      cardBg: "linear-gradient(180deg,rgba(0,0,0,.8) 26%,rgba(69,162,158,.8))",
    },
    {
      id: 6,
      image: "/images/vip/vip6.png",
      title: `${t("level")} 6`,
      dailyPoint: "20%",
      compPoint: "5000",
      weeklyPoint: "10%",
      wager: "X35",
      titleBg: "linear-gradient(270deg,#000610 0,#662d91 29%,#662d91 75%,#000)",
      cardBg: "linear-gradient(180deg,rgba(0,0,0,.8) 26%,rgba(102,45,145,.8))",
    },
  ];
};
