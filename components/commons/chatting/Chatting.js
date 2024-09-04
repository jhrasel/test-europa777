import useApi from "@/helpers/apiRequest";
import { useEffect, useState } from "react";

const TawkToChat = () => {
  const { fetchData } = useApi();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await fetchData("/player/getProfile", "GET");

      if (data) {
        setUserData(data.Player);
      } else if (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      // Create and inject the Tawk.to script
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.innerHTML = `
        var Tawk_API=Tawk_API||{};
        Tawk_API.visitor = {
          name : '${userData.first_name || "Visitor Name"} ${
        userData.last_name || ""
      }',
          email : '${userData.email || "visitor@email.com"}',
          hash : '${
            userData.hash || "hash-value"
          }' // Adjust if you have hash value logic
        };

        var Tawk_LoadStart=new Date();
        (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/66d8974c50c10f7a00a404b0/1i6v0u0cs';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
        })();
      `;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [userData]);

  return null;
};

export default TawkToChat;



