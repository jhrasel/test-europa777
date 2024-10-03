import Cookies from "js-cookie";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`;

// Generic API fetch function to handle common logic
async function apiFetch(url, options = {}) {
  const token = Cookies.get("token");

  try {
    const response = await fetch(`${apiUrl}${url}`, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : null,
      cache: "no-store",
      next: { revalidate: 60 },
      ...options.config,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
}

// Specific API functions using the generic apiFetch
export async function fetchFreeSpinAPI(page = 1) {
  return apiFetch(`/player/getFreeSpinsHistory?page=${page}`);
}

export async function fetchActiveBonusAPI(page = 1) {
  return apiFetch(`/player/getActiveBonus?page=${page}`);
}

export async function fetchBonusHistoryAPI(page = 1) {
  return apiFetch(`/player/getBonusHistory?page=${page}`);
}

export async function fetchGameLogAPI(page = 1) {
  return apiFetch(`/player/getGamePlayHistory?page=${page}`);
}

export async function fetchCashbackHistoryAPI() {
  return apiFetch(`/player/getCashbackHistory`);
}
