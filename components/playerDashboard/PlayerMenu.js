"use client";
import { PlayerDashboardMenuOld } from "@/data/PlayerDBMenu";
import { usePathname } from "next/navigation";
import { Card, UILink } from "../UI";

export const PlayerMenu = () => {
  const menu = PlayerDashboardMenuOld();
  const router = usePathname();

  // Function to check if any submenu item is active
  const isSubMenuActive = (subMenu) => {
    return subMenu?.some((subItem) => router === subItem.url);
  };

  return (
    <>
      <section className="mt-5 mb-10">
        <Card className="bg-opacity-0 !p-0 shadow-none">
          <div className="">
            {/* Main menu items */}
            <div className="flex flex-wrap">
              {menu.map((data) => (
                <div key={data.id} className="flex items-center gap-5">
                  <UILink
                    href={data.url}
                    className={`px-3 tab:px-5 py-2 rounded-lg justify-start !text-sm tab:!text-base m-1 tab:mx-2 ${
                      router === data.url || isSubMenuActive(data.subMenu)
                        ? "bg-bg-color2 !text-white"
                        : "bg-white !text-bg-color2"
                    }`}
                    icon={data.icon}
                    name={data.name}
                  />
                </div>
              ))}
            </div>

            {/* Sub-menu items */}
            <div className="mt-4">
              {menu.map(
                (data) =>
                  (router === data.url || isSubMenuActive(data.subMenu)) &&
                  data.subMenu && (
                    <ul
                      key={data.id}
                      className="flex flex-wrap gap-2 tab:gap-5"
                    >
                      {data.subMenu.map((subItem) => (
                        <li key={subItem.id}>
                          <UILink
                            href={subItem.url}
                            className={`w-full px-1 tab:px-5 py-2 justify-start !text-xs tab:!text-base ${
                              router === subItem.url
                                ? "border-b-2 border-blue-color text-white"
                                : ""
                            }`}
                            icon={subItem.icon}
                            name={subItem.name}
                          />
                        </li>
                      ))}
                    </ul>
                  )
              )}
            </div>
          </div>
        </Card>
      </section>
    </>
  );
};
