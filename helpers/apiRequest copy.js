// hooks/useApi.js
import Cookies from "js-cookie";
import { useState } from "react";

function useApi() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const apiUrl = process.env.API_URL;
  // const apiUrl = "https://canada777.test/api";
  const apiUrl = "https://canada777.com/api";
  // const apiUrl = "https://backoffice.europa777.com/api";

  const fetchData = async (endpoint, method, bodyData = null) => {
    const url = apiUrl + endpoint; // Construct the full URL
    const apiKey = Cookies.get("token");
    setIsLoading(true);
    try {
      const options = {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: bodyData ? JSON.stringify(bodyData) : null,
        // cache: "no-store",es4wq
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      setIsLoading(false);
      return responseData;
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      throw error;
    }
  };

  return { fetchData, error, isLoading, setIsLoading };
}

export default useApi;
