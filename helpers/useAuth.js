import Cookies from "js-cookie";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    const clientSideIsLoggedIn = !!Cookies.get("isLoggedIn");
    if (clientSideIsLoggedIn !== isLoggedIn) {
      setIsLoggedIn(clientSideIsLoggedIn);
    }
  }, [isLoggedIn]);

  const login = () => {
    Cookies.set("isLoggedIn", true);
    setIsLoggedIn(true);
  };

  const user = () => {
    let user = Cookies.get("isLoggedIn");
    if (user) {
      return JSON.parse(user || {});
    }
    return {};
  };

  const logout = () => {
    let route = `/${locale}/`;

    const admin = Cookies.get("admin_token");

    Cookies.remove("isLoggedIn");
    Cookies.remove("token");
    Cookies.remove("admin_token");
    Cookies.remove("user");
    setIsLoggedIn(false);

    if (admin) {
      route = `${process.env.NEXT_PUBLIC_API_URL}/impersonate_logout?admin_token=${admin}`;
    }

    window.location.href = route;
  };

  return { isLoggedIn, user, login, logout };
};

export default useAuth;
