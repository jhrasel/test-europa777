import { useEffect } from "react";

export default function NewTwak() {
  useEffect(() => {
    // Check if the Tawk.to script is already loaded to avoid duplicate injections
    if (!window.Tawk_API) {
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();

      // Dynamically inject the Tawk.to script
      (function () {
        var s1 = document.createElement("script");
        var s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = "https://embed.tawk.to/66d8974c50c10f7a00a404b0/1i6v0u0cs";
        s1.charset = "UTF-8";
        s1.setAttribute("crossorigin", "*");
        s0.parentNode.insertBefore(s1, s0);
      })();
    }
  }, []);

  return <div></div>;
}
