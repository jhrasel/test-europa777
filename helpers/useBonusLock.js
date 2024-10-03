import useAuth from "@/helpers/useAuth";
import { fetchLockByBonus } from "@/lib/fetchLockByBonus";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

export const useBonusLock = () => {
  const { isLoggedIn } = useAuth();
  const locale = useLocale();
  const [lockByBonus, setLockByBonus] = useState(null);

  // console.log("lockByBonus", lockByBonus);

  // Fetch lock data
  useEffect(() => {
    const getLockData = async () => {
      if (isLoggedIn) {
        try {
          const data = await fetchLockByBonus();
          setLockByBonus(data.Player);
        } catch (err) {
          console.error(err);
        }
      }
    };
    getLockData();
  }, [isLoggedIn]);

  // Render the correct link
  const renderLink = (gameData) => {
    const haveDepositBonus =
      lockByBonus?.promotion_type === "noDepositBonus" &&
      gameData?.no_dep_bonus === 1;
    const noDepositBonus =
      lockByBonus?.promotion_type === "noDepositBonus" &&
      gameData?.no_dep_bonus === 0;

    if (haveDepositBonus) {
      return `/${locale}/play-game/${gameData.slug}`;
    } else if (noDepositBonus) {
      return {
        link: `/${locale}/player-dashboard/deposit`,
        text: "LOCK IN BONUS",
      };
    } else {
      return `/${locale}/play-game/${gameData.slug}`;
    }
  };

  return {
    lockByBonus,
    renderLink,
  };
};
