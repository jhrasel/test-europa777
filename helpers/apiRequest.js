// import axios from "axios";
// import Cookies from "js-cookie";
// import { useCallback, useState } from "react";
// import toast from "react-hot-toast";

// function useApi() {
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`;
//   // const apiUrl = `https://backoffice.europa777.com/api`;
//   // const apiUrl = `https://beta.canada777.com/api`;

//   const fetchData = useCallback(
//     async (endpoint, method, bodyData = null, token = null) => {
//       const url = apiUrl + endpoint;
//       const apiKey = token || Cookies.get("token");
//       setIsLoading(true);
//       try {
//         const options = {
//           method: method,
//           headers: {
//             "Content-Type": "application/json",
//             "X-Requested-With": "XMLHttpRequest",
//             Authorization: `Bearer ${apiKey}`,
//           },
//           data: bodyData,
//         };

//         const response = await axios(url, options);
//         const responseData = response.data;
//         return responseData;
//       } catch (error) {
//         "error", error;
//         if (error.response.data.message) {
//           toast.error(error.response.data.message);
//         } else if (error.message) {
//           toast.error(error.message);
//         }
//         setIsLoading(false);
//         throw error;
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     []
//   );

//   return { fetchData, error, isLoading, setIsLoading };
// }

// export default useApi;

// export default useApi;

import axios from "axios";
import Cookies from "js-cookie";
import { useCallback, useState } from "react";

function useApi() {
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`;

  const fetchData = useCallback(
    async (endpoint, method, bodyData = null, token = null, headers) => {
      const url = apiUrl + endpoint;
      const apiKey = token || Cookies.get("token");
      setIsLoading(true);
      try {
        const options = {
          method: method,
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Authorization: `Bearer ${apiKey}`,
            ...headers,
          },
          data: bodyData,
        };

        const response = await axios(url, options);
        const responseData = response.data;
        const status = response.status;

        return { data: responseData, status, error: null };
      } catch (error) {
        const status = error.response ? error.response.status : null;
        return {
          data: null,
          status,
          error: error.response ? error.response.data : error,
        };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { fetchData, isLoading, setIsLoading };
}

export default useApi;
