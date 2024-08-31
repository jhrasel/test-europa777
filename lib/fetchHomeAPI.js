import Cookies from "js-cookie";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export async function fetchTopGames() {
  const result = await fetch(`${apiUrl}/getTopGames`);

  return result.json();
}

export async function fetchHotGames() {
  const result = await fetch(`${apiUrl}/getHotGames`);

  return result.json();
}

export async function fetchLiveCasinoGames() {
  const result = await fetch(`${apiUrl}/getLiveGames`);

  return result.json();
}

export async function fetchAllGameProviders() {
  const result = await fetch(`${apiUrl}/getAllGameProviders`);

  return result.json();
}

export async function fetchGameWinner() {
  try {
    const response = await fetch(`${apiUrl}/latestWinners`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching game winner:", error);
    throw error;
  }
}

export async function fetchRecentGameHistory() {
  const token = Cookies.get("token");

  try {
    const response = await fetch(`${apiUrl}/player/getRecentGameHistory`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching recent game history:", error);
    throw error;
  }
}
