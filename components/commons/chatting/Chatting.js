import { useEffect } from "react";

const TawkToChat = ({ userName, userEmail }) => {
  useEffect(() => {
    window.Tawk_API = window.Tawk_API || {};

    const loadTawkTo = () => {
      window.Tawk_API.visitor = {
        name: userName,
        email: userEmail,
      };
    };

    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = "https://embed.tawk.to/6306272254f06e12d8907c8c/1gb80ho5i";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s1.onload = loadTawkTo;
    document.body.appendChild(s1);

    return () => {
      document.body.removeChild(s1);
    };
  }, [userName, userEmail]);

  return null;
};

export default TawkToChat;
