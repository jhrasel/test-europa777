const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export async function fetchLiveCasinoGames(page = 1) {
  const response = await fetch(
    `${apiUrl}/getGamesByType/live-casino?page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch slot games");
  }

  const data = await response.json();
  return data;
}
