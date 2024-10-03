import { List, ListItem, UILink } from "@/components/UI";
import SignIn from "@/components/signIn/SignIn";
import useApi from "@/helpers/apiRequest";
import useAuth from "@/helpers/useAuth";
import Slots from "@/svgs/Slots";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { BiSupport } from "react-icons/bi";
import { BsCashCoin } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { GiCardAceSpades } from "react-icons/gi";
import { GameModal } from "../banner/modal/GameModal";

export default function FooterMenu({ closeModal }) {
  const { isLoggedIn } = useAuth();
  const { fetchData } = useApi();
  const [userData, setUserData] = useState(null);
  const t = useTranslations("Menubar");
  const locale = useLocale();

  useEffect(() => {
    if (isLoggedIn) {
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

  // const openTawkChat = () => {
  //   if (userData) {
  //     var Tawk_API = Tawk_API || {};
  //     Tawk_API.visitor = {
  //       name: `${userData.username || "Visitor"}`,
  //       email: userData.email || "visitor@email.com",
  //     };

  //     var Tawk_LoadStart = new Date();
  //     (function () {
  //       var s1 = document.createElement("script"),
  //         s0 = document.getElementsByTagName("script")[0];
  //       s1.async = true;
  //       s1.src = "https://embed.tawk.to/66d8974c50c10f7a00a404b0/1i6v0u0cs";
  //       s1.charset = "UTF-8";
  //       s1.setAttribute("crossorigin", "*");
  //       s0.parentNode.insertBefore(s1, s0);
  //     })();
  //   } else {
  //     // Open the chat without user info if user is not logged in
  //     window.open(
  //       "https://tawk.to/chat/66d8974c50c10f7a00a404b0/1i6v0u0cs",
  //       "_blank"
  //     );
  //   }
  // };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-bg-color3 px-5 py-1 z-50 flex tab:hidden items-start justify-between gap-2">
      <List className="flex items-center justify-between w-full">
        {/* Slots */}
        <ListItem>
          <UILink
            className="!flex-col justify-center !gap-0.5 !text-sm"
            href={`/${locale}/slot`}
            icon={<Slots />}
            name={t("Slots")}
          />
        </ListItem>

        {/* Live Casino */}
        <ListItem>
          <UILink
            className="!flex-col justify-center !gap-0.5 !text-sm"
            href={`/${locale}/live-casino`}
            icon={<GiCardAceSpades />}
            name={t("Live")}
          />
        </ListItem>

        {/* Deposit */}
        <ListItem className="-mt-8">
          {isLoggedIn ? (
            <UILink
              className="!flex-col justify-center !gap-0.5 !text-sm w-16 h-16 bg-blue-color rounded-full"
              href={`/${locale}/player-dashboard/deposit`}
              icon={<BsCashCoin />}
              name={t("Deposit")}
            />
          ) : (
            <SignIn
              name={
                <UILink
                  className="!flex-col justify-center !gap-0.5 !text-sm w-16 h-16 bg-blue-color rounded-full"
                  href={`/${locale}/player-dashboard/deposit`}
                  icon={<BsCashCoin />}
                  name={t("Deposit")}
                />
              }
              className="!border-[0px] hover:!bg-none hover:!shadow-none !px-[0px] !py-[0px]"
            />
          )}
        </ListItem>

        {/* GameModal */}
        <ListItem>
          <UILink
            className="!flex-col justify-center !gap-0.5 !text-sm"
            href="#"
            icon={<CiSearch />}
            name={
              <GameModal
                icon={null}
                title="Search"
                className="!bg-bg-color3 !border-0 !shadow-none !block !p-0 !m-0 !leading-none !h-5"
              />
            }
            onClick={() => closeModal()}
          />
        </ListItem>

        {/* Support */}
        <ListItem>
          <div className="">
            <UILink
              className="!flex-col justify-center !gap-0.5 !text-sm"
              href="https://tawk.to/europa777"
              target="_blank"
              icon={<BiSupport />}
              name={<span>Support</span>}
            />
          </div>
        </ListItem>
      </List>
    </div>
  );
}
