import { Tabs } from "antd";
import { useTranslations } from "next-intl";
import Favorites from "./Favorites";
import { GamesProvider } from "./GamesProvider";
import { SearchGames } from "./SearchGames";

// SearchTabs
export const SearchTabs = ({ closeModal }) => {
  const t = useTranslations("HomePage");

  // modal
  const onChange = (key) => {
    //(key);
  };
  const items = [
    {
      key: "1",
      label: t("Games"),
      children: <SearchGames closeModal={closeModal} />,
    },
    {
      key: "2",
      label: t("Providers"),
      children: <GamesProvider closeModal={closeModal} />,
    },
    {
      key: "3",
      label: t("Favorites"),
      children: <Favorites closeModal={closeModal} />,
    },
  ];

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        className="text-white"
      />
    </>
  );
};
