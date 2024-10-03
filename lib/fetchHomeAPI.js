import Cookies from "js-cookie";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`;

async function apiFetch(url, options = {}) {
  const token = Cookies.get("token");

  try {
    const result = await fetch(`${apiUrl}${url}`, {
      next: { revalidate: 60 },
      method: options.method || "GET",
      cache: options.cache || "no-store", 
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}), 
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : null,
    });

    if (!result.ok) {
      const error = await result.json();
      throw new Error(error.message || "Something went wrong");
    }

    return result.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
}

// Example API functions using the enhanced apiFetch
export async function fetchNewGames() {
  return apiFetch("/getNewGames");
}

export async function fetchTopGames() {
  return apiFetch("/getTopGames");
}

export async function fetchHotGames() {
  return apiFetch("/getHotGames");
}

export async function fetchLiveCasinoGames() {
  return apiFetch("/getLiveGames");
}

export async function fetchAllGameProviders() {
  return apiFetch("/getAllGameProviders");
}

export async function fetchGameWinner() {
  return apiFetch("/latestWinners");
}

export async function fetchRecentGameHistory() {
  return apiFetch("/player/getRecentGameHistory", {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  });
}
