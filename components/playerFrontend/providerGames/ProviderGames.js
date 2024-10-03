import { Container, GameCard, H2 } from "@/components/UI";
import { useFavoriteGames } from "@/context/FavoriteGamesContext";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import useApi from "@/helpers/apiRequest";
import useAuth from "@/helpers/useAuth";
import { useBonusLock } from "@/helpers/useBonusLock";
import { Empty } from "antd";
import { useLocale } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FadeLoader } from "react-spinners";

export default function ProviderGames({ slagId }) {
  const { fetchData, isLoading } = useApi();
  const { favoriteGames } = useFavoriteGames();
  const [gameDatas, setGameDatas] = useState([]);
  const locale = useLocale();
  const { isLoggedIn } = useAuth();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const [lockByBonus, setLockByBonus] = useState(null);

  const [activeCardId, setActiveCardId] = useState(null);

  const { renderLink } = useBonusLock();

  const lastGameElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const handleFavoriteChange = (gameId, isFavorite) => {
    `Game ${gameId} is now ${isFavorite ? "favorited" : "unfavorited"}`;
    fetchGameData(page);
  };

  const fetchGameData = async (currentPage) => {
    const { data, error } = await fetchData(
      `/searchGames?provider_name=${slagId}&page=${currentPage}`,
      "GET"
    );

    if (data) {
      const newGames = data.games.data;
      setGameDatas((prevGames) => [...prevGames, ...newGames]);
      setHasMore(data.games.next_page_url !== null);
    } else if (error) {
      console.error("API Request Error:", error);
      toast.error(
        error.message || "Failed to fetch game data. Please try again."
      );
    }
  };

  useEffect(() => {
    fetchGameData(page);
  }, [slagId, page]);

  if (isLoading)
    return (
      <Container>
        <div className="mt-2 m-auto text-center flex items-center justify-center">
          <FadeLoader color="#FFF" />
        </div>
      </Container>
    );

  return (
    <>
      <section>
        <Container>
          <H2
            name={gameDatas[0]?.provider}
            className="text-center py-5 mb-5 bg-bg-color2"
          />

          <div className="grid grid-cols-2 tab:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-6 gap-2 tab:gap-5">
            {gameDatas.map((gameData, index) => {
              const liveLink = renderLink(gameData);
              const isLiveLinkObject = typeof liveLink === "object";
              if (gameDatas.length === index + 1) {
                return (
                  <div ref={lastGameElementRef} key={gameData.id}>
                    <GameCard
                      key={gameData.id}
                      gameId={gameData.id}
                      image={gameData.thumbnail || "/images/default-cart.jpg"}
                      gameName={gameData.game_name}
                      initialIsFavorite={favoriteGames.includes(gameData.id)}
                      onFavoriteChange={handleFavoriteChange}
                      liveLink={!isLiveLinkObject ? liveLink : ""}
                      liveLinkText={isLiveLinkObject ? liveLink.text : "Play"}
                      depositLink={isLiveLinkObject ? liveLink.link : ""}
                      demoLink={
                        gameData.demo === 1
                          ? `/${locale}/demo-game/${gameData.slug}`
                          : ""
                      }
                      activeCardId={activeCardId}
                      setActiveCardId={setActiveCardId}
                    />
                  </div>
                );
              } else {
                return (
                  <GameCard
                    key={gameData.id}
                    gameId={gameData.id}
                    image={gameData.thumbnail || "/images/default-cart.jpg"}
                    gameName={gameData.game_name}
                    initialIsFavorite={favoriteGames.includes(gameData.id)}
                    onFavoriteChange={handleFavoriteChange}
                    liveLink={!isLiveLinkObject ? liveLink : ""}
                    liveLinkText={isLiveLinkObject ? liveLink.text : "Play"}
                    depositLink={isLiveLinkObject ? liveLink.link : ""}
                    demoLink={
                      gameData.demo === 1
                        ? `/${locale}/demo-game/${gameData.slug}`
                        : ""
                    }
                    activeCardId={activeCardId}
                    setActiveCardId={setActiveCardId}
                  />
                );
              }
            })}
            {isLoading &&
              Array.from({ length: 6 }).map((_, index) => (
                <CustomSkeleton key={index} hasImage={true} hasText={true} />
              ))}
            {!isLoading && gameDatas.length === 0 && (
              <Empty
                description="No data available"
                className="mt-5 text-center col-span-6"
              />
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
