"use client";
import Cookies from "js-cookie";
import { useState } from "react";

function useCookies() {
  const [cookies, setCookie] = useState(Cookies.get());

  const setCookies = (name, value, options = {}) => {
    setCookie((prevCookies) => {
      Cookies.set(name, value, options);
      return {
        ...prevCookies,
        [name]: value,
      };
    });
  };

  const removeCookie = (name) => {
    setCookie((prevCookies) => {
      Cookies.remove(name);
      const { [name]: deletedCookie, ...remainingCookies } = prevCookies;
      return remainingCookies;
    });
  };

  return { cookies, setCookies, removeCookie };
}

export default useCookies;
