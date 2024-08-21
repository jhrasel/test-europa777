import useApi from "@/helpers/apiRequest";
import useAuth from "@/helpers/useAuth";
import { useEffect, useState } from "react";

// Custom hook for fetching balance
const useBalance = () => {
  const [balance, setBalance] = useState(null);

  const { isLoggedIn } = useAuth();

  const { fetchData } = useApi();

  // useEffect(() => {
  //   const fetchBalanceData = async () => {
  //     if (isLoggedIn) {
  //       try {
  //         const response = await fetchData("/player/getBalance", "GET");
  //         console.log("getBalance", response.balance);
  //         setBalance(response.balance);
  //       } catch (error) {
  //         console.error("Error fetching balance:", error);
  //         setBalance(0);
  //       }
  //     } else {
  //       console.log("User is not logged in. Skipping API call.");
  //       setBalance(0);
  //     }
  //   };

  //   fetchBalanceData();
  // }, [isLoggedIn, fetchData]);

  useEffect(() => {
    const fetchBalanceData = async () => {
      if (isLoggedIn) {
        const { data, error } = await fetchData("/player/getBalance", "GET");
        if (data) {
          // console.log("getBalance", data.balance);
          setBalance(data.balance);
        } else if (error) {
          // if (error.message) {
          //   toast.error(error.message);
          // } else {
          //   toast.error("An unexpected error occurred. Please try again.");
          // }
          setBalance(0);
        }
      }
    };

    fetchBalanceData();
  }, [isLoggedIn, fetchData]);

  return balance;
};

export default useBalance;
