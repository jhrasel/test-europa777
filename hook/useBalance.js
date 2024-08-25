import useApi from "@/helpers/apiRequest";
import useAuth from "@/helpers/useAuth";
import { useEffect, useState } from "react";

// Custom hook for fetching balance
const useBalance = () => {
  const [balance, setBalance] = useState(null);

  const { isLoggedIn } = useAuth();

  const { fetchData } = useApi();

  useEffect(() => {
    const fetchBalanceData = async () => {
      if (isLoggedIn) {
        const { data, error } = await fetchData("/player/getBalance", "GET");
        if (data) {
          // console.log("getBalance", data.balance);
          setBalance(data.balance);
        } else if (error) {
          setBalance(0);
        }
      }
    };

    fetchBalanceData();
  }, [isLoggedIn, fetchData]);

  return balance;
};

export default useBalance;
