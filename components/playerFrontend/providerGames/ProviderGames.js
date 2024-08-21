import { Container, GameCard, H2 } from "@/components/UI";
import { useFavoriteGames } from "@/context/FavoriteGamesContext";
import CustomSkeleton from "@/helpers/CustomSkeleton";
import useApi from "@/helpers/apiRequest";
import useAuth from "@/helpers/useAuth";
import { fetchLockByBonus } from "@/lib/fetchLockByBonus";
import { Empty } from "antd";
import { useLocale } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FadeLoader } from "react-spinners";

export default function ProviderGames({ slagId }) {
  const { fetchData } = useApi();
  const { favoriteGames } = useFavoriteGames();
  const [gameDatas, setGameDatas] = useState([]);
  const locale = useLocale();
  const { isLoggedIn } = useAuth();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const [lockByBonus, setLockByBonus] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const getLockData = async () => {
      if (isLoggedIn) {
        setIsLoading(true);
        try {
          const data = await fetchLockByBonus();
          // console.log("fetchLockByBonus", data);
          setLockByBonus(data);
        } catch (err) {
          setError(err.message || "Failed to fetch lock data");
        } finally {
          setIsLoading(false);
        }
      }
    };

    getLockData();
  }, [isLoggedIn]);

  if (isLoading)
    return (
      <Container>
        <div className="mt-2 m-auto text-center flex items-center justify-center">
          <FadeLoader color="#FFF" />
        </div>
      </Container>
    );
  if (error)
    return (
      <Container>
        <div className="mt-2 m-auto ">Error: {error}</div>
      </Container>
    );

  const renderLink = (gameData) => {
    const isNoDepositBonus = lockByBonus?.promotion_type === "noDepositBonus";
    const isAkaPovProvider = gameData?.api_provider === "Akapov";
    const isEvolutionProvider = gameData?.provider != "Evolution";
    const isSameApiProvider =
      lockByBonus?.provider_name === gameData.api_provider;

    if (
      isNoDepositBonus &&
      isAkaPovProvider &&
      isEvolutionProvider &&
      isSameApiProvider
    ) {
      return `/${locale}/play-game/${gameData.slug}`;
    } else if (
      isNoDepositBonus &&
      !isAkaPovProvider &&
      (!isEvolutionProvider || !isSameApiProvider)
    ) {
      return {
        link: `/${locale}/player-dashboard/deposit`,
        text: "LOCK IN BONUS",
      };
    } else {
      return `/${locale}/play-game/${gameData.slug}`;
    }
  };

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
