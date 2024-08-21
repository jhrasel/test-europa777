import { List, ListItem, UILink } from "@/components/UI";
import SignIn from "@/components/signIn/SignIn";
import useAuth from "@/helpers/useAuth";
import Slots from "@/svgs/Slots";
import { useLocale, useTranslations } from "next-intl";
import { BiSupport } from "react-icons/bi";
import { BsCashCoin } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { HiHome } from "react-icons/hi";
import { GameModal } from "../banner/modal/GameModal";
import { GiCardAceSpades } from "react-icons/gi";

export default function FooterMenu({ closeModal }) {
  const { isLoggedIn } = useAuth();

  const t = useTranslations("Menubar");
  const locale = useLocale();

  return (
    <>
      <div className=" fixed bottom-0 left-0 w-full bg-bg-color3 px-5 py-1 z-50 flex tab:hidden items-start justify-between gap-2">
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

          {/* Slots */}
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
          {/* Profile */}
          <ListItem>
            <div className="">
              <UILink
                className="!flex-col justify-center !gap-0.5 !text-sm"
                href="https://tawk.to/chat/6306272254f06e12d8907c8c/1gb80ho5i"
                target="_blank"
                icon={<BiSupport />}
                name="Support"
              />
            </div>

            {/* {isLoggedIn ? (
              <UILink
                className="!flex-col justify-center !gap-0.5 !text-sm"
                href="/player-dashboard/profile"
                icon={<FaUserCircle />}
                name="Profile"
              />
            ) : (
              <SignIn
                name={
                  <UILink
                    className="!flex-col justify-center !gap-0.5 !text-sm"
                    href="/player-dashboard/profile"
                    icon={<FaUserCircle />}
                    name="Profile"
                  />
                }
                className="!border-[0px] hover:!bg-none hover:!shadow-none !px-[0px] !py-[0px]"
              />
            )} */}
          </ListItem>
        </List>
      </div>
    </>
  );
}
