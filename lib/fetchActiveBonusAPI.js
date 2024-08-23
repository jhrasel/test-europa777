import Cookies from "js-cookie";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export async function fetchActiveBonusAPI() {
  const token = Cookies.get("token");

  const response = await fetch(`${apiUrl}/player/getActiveBonus`, {
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

export async function fetchBonusHistoryAPI() {
  const token = Cookies.get("token");

  const response = await fetch(`${apiUrl}/player/getBonusHistory`, {
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
