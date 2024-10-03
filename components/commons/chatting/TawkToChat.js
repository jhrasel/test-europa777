import useApi from "@/helpers/apiRequest";
import { useEffect, useState } from "react";

const TawkToChat = () => {
  const [userData, setUserData] = useState(null);
  const { fetchData } = useApi();
  const isLoggedIn = true; // Replace with your actual logged-in state

  useEffect(() => {
    if (isLoggedIn) {
      // Fetch user data when logged in
      const fetchUserData = async () => {
        const { data, error } = await fetchData("/player/getProfile", "GET");

        if (data) {
          setUserData(data.Player);
        } else if (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [isLoggedIn, fetchData]);

  useEffect(() => {
    // Initialize Tawk.to script if not already present
    const addTawkToScript = () => {
      var Tawk_API = Tawk_API || {};
      Tawk_API.onLoad = function () {
        if (userData) {
          Tawk_API.visitor = {
            name: userData.name,
            email: userData.email,
          };
        }
      };

      // Check if Tawk.to script is already added
      if (!window.Tawk_API) {
        var s1 = document.createElement("script");
        s1.async = true;
        s1.src = "https://embed.tawk.to/66d8974c50c10f7a00a404b0/1i6v0u0cs";
        s1.charset = "UTF-8";
        s1.setAttribute("crossorigin", "*");
        document.body.appendChild(s1);
      }
    };

    addTawkToScript(); // Load the script regardless of whether userData exists

    // Set visitor information dynamically when userData is available
    if (userData && window.Tawk_API) {
      window.Tawk_API.visitor = {
        name: userData.name,
        email: userData.email,
      };
    }
  }, [userData]);

  return (
    <div>
      {/* Render user data or a loading state */}
      {userData ? (
        <div>
          <h2>Welcome, {userData.name}!</h2>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default TawkToChat;
