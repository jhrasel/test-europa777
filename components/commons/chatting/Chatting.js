import useApi from "@/helpers/apiRequest";
import { useEffect, useState } from "react";

const TawkToChat = () => {
  const { fetchData } = useApi();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await fetchData("/player/getProfile", "GET");

      // console.log("getProfile", data?.Player?.email);

      if (data) {
        setUserData(data.Player);
      }
    };

    fetchUserData();
  }, [fetchData]);

  useEffect(() => {
    // Inject the Tawk.to script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://embed.tawk.to/66d8974c50c10f7a00a404b0/1i6v0u0cs";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);

    script.onload = () => {
      if (window.Tawk_API) {
        window.Tawk_API.onLoad = function () {
          // Set visitor info once the widget is ready
          window.Tawk_API.setAttributes(
            {
              name: userData ? userData.username : "Visitor",
              email: userData ? userData.email : "visitor@example.com",
            },
            function (error) {
              if (error) console.log("Error setting visitor details:", error);
            }
          );
        };
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [userData]);

  return null;
};

export default TawkToChat;



