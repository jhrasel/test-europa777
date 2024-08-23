import useAuth from "@/helpers/useAuth";
import { fetchBalanceAPI } from "@/lib/fetchBalanceAPI";
import { useEffect, useState } from "react";

const useBalance = () => {
  const [balance, setBalance] = useState(null);
  const { isLoggedIn } = useAuth();

  const fetchBalanceData = async () => {
    if (isLoggedIn) {
      try {
        const data = await fetchBalanceAPI();
        // console.log("fetchBalanceAPI", data);
        setBalance(data.balance);
      } catch (error) {
        console.error("Fetch balance error:", error);
        setBalance(0);
      }
    }
  };

  useEffect(() => {
    fetchBalanceData();
  }, [isLoggedIn]);

  return balance;
};

export default useBalance;
