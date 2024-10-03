import useApi from "@/helpers/apiRequest";
import { useEffect, useState } from "react";

const TawkToChat = () => {
  const { fetchData } = useApi();
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const fetchUserDataAndLoadTawk = async () => {
      try {
        // Fetch user data
        const { data } = await fetchData("/player/getProfile", "GET");

        if (data) {
          setUserData(data?.Player);
        }
        if (!document.getElementById("tawkto-script")) {
          const script = document.createElement("script");
          script.type = "text/javascript";
          script.async = true;
          script.src =
            "https://embed.tawk.to/66d8974c50c10f7a00a404b0/1i6v0u0cs";
          script.charset = "UTF-8";
          script.setAttribute("crossorigin", "*");
          script.id = "tawkto-script";
          document.body.appendChild(script);

          script.onload = () => {
            if (window.Tawk_API) {
              window.Tawk_API.onLoad = function () {
                window.Tawk_API.setAttributes(
                  {
                    name: userData?.username || "Visitor",
                    email: userData?.email || "visitor@example.com",
                  },
                  function (error) {
                    if (error)
                      console.log("Error setting visitor details:", error);
                  }
                );
              };
            }
          };
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserDataAndLoadTawk();
  }, [fetchData, userData]);

  return null;
};

export default TawkToChat;
