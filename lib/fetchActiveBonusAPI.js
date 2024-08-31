import Cookies from "js-cookie";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export async function fetchFreeSpinAPI(page = 1) {
  const token = Cookies.get("token");

  try {
    const response = await fetch(
      `${apiUrl}/player/getFreeSpinsHistory?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchActiveBonusAPI(page = 1) {
  const token = Cookies.get("token");

  try {
    const response = await fetch(
      `${apiUrl}/player/getActiveBonus?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchBonusHistoryAPI(page = 1) {
  const token = Cookies.get("token");

  try {
    const response = await fetch(
      `${apiUrl}/player/getBonusHistory?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }

    return response.json();
  } catch (error) {
    // console.error("Error fetching bonus history:", error);
    throw error;
  }
}

export async function fetchGameLogAPI(page = 1) {
  const token = Cookies.get("token");

  try {
    const response = await fetch(
      `${apiUrl}/player/getGamePlayHistory?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}
