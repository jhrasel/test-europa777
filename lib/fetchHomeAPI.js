const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`;
import Cookies from "js-cookie";

export async function fetchHomePageGames() {
  const result = await fetch(`${apiUrl}/getAllGames`);

  return result.json();
}

export async function fetchGameWinner() {
  const result = await fetch(`${apiUrl}/latestWinners`);

  return result.json();
}

export async function fetchRecentGameHistory() {
  const token = Cookies.get("token");

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
}
