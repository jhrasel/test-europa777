// components/TawkToChat.js
import { useEffect } from "react";

const TawkToChat = ({ userName, userEmail }) => {
  useEffect(() => {
    // Function to initialize Tawk.to script
    const loadTawkToScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.innerHTML = `
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
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

      // Wait for Tawk.to script to load and then set user info
      script.onload = () => {
        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_API.onLoad = function () {
          window.Tawk_API.setAttributes({
            name: userName,
            email: userEmail,
          });
        };
      };

      return () => {
        document.body.removeChild(script);
      };
    };

    loadTawkToScript();
  }, [userName, userEmail]);

  return null;
};

export default TawkToChat;
