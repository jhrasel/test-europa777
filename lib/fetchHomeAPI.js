import Cookies from "js-cookie";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export async function fetchTopGames() {
  try {
    const result = await fetch(`${apiUrl}/getTopGames`);

    if (!result.ok) {
      const error = await result.json();
      throw new Error(error.message || "Something went wrong");
    }

    return result.json();
  } catch (error) {
    console.error("Error fetching top games:", error);
    throw error;
  }
}

export async function fetchHotGames() {
  try {
    const result = await fetch(`${apiUrl}/getHotGames`);

    if (!result.ok) {
      const error = await result.json();
      throw new Error(error.message || "Something went wrong");
    }

    return result.json();
  } catch (error) {
    console.error("Error fetching hot games:", error);
    throw error;
  }
}

export async function fetchLiveCasinoGames() {
  try {
    const result = await fetch(`${apiUrl}/getLiveGames`);

    if (!result.ok) {
      const error = await result.json();
      throw new Error(error.message || "Something went wrong");
    }

    return result.json();
  } catch (error) {
    console.error("Error fetching live casino games:", error);
    throw error;
  }
}

export async function fetchAllGameProviders() {
  try {
    const result = await fetch(`${apiUrl}/getAllGameProviders`);

    if (!result.ok) {
      const error = await result.json();
      throw new Error(error.message || "Something went wrong");
    }

    return result.json();
  } catch (error) {
    console.error("Error fetching all game providers:", error);
    throw error;
  }
}

export async function fetchGameWinner() {
  try {
    const result = await fetch(`${apiUrl}/latestWinners`);

    if (!result.ok) {
      const error = await result.json();
      throw new Error(error.message || "Something went wrong");
    }

    return result.json();
  } catch (error) {
    console.error("Error fetching game winner:", error);
    throw error;
  }
}

export async function fetchRecentGameHistory() {
  const token = Cookies.get("token");

  try {
    const result = await fetch(`${apiUrl}/player/getRecentGameHistory`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!result.ok) {
      const error = await result.json();
      throw new Error(error.message || "Something went wrong");
    }

    return result.json();
  } catch (error) {
    console.error("Error fetching recent game history:", error);
    throw error;
  }
}
