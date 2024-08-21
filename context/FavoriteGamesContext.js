"use client";

// FavoriteGamesContext.js
import { createContext, useContext, useEffect, useState } from "react";

const FavoriteGamesContext = createContext();

export const useFavoriteGames = () => {
  return useContext(FavoriteGamesContext);
};

export const FavoriteGamesProvider = ({ children }) => {
  const [favoriteGames, setFavoriteGames] = useState([]);

  useEffect(() => {
    // Retrieve favorite games from local storage on component mount
    const storedFavorites =
      JSON.parse(localStorage.getItem("favoriteGames")) || [];
    setFavoriteGames(storedFavorites);
  }, []);

  const toggleFavorite = (gameId) => {
    setFavoriteGames((prevFavorites) => {
      const newFavorites = prevFavorites.includes(gameId)
        ? prevFavorites.filter((id) => id !== gameId)
        : [...prevFavorites, gameId];

      // Store updated favorites in local storage
      localStorage.setItem("favoriteGames", JSON.stringify(newFavorites));

      return newFavorites;
    });
  };

  return (
    <FavoriteGamesContext.Provider value={{ favoriteGames, toggleFavorite }}>
      {children}
    </FavoriteGamesContext.Provider>
  );
};
