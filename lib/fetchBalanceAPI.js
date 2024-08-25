import Cookies from "js-cookie";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export async function fetchBalanceAPI() {
  const token = Cookies.get("token");

  try {
    const response = await fetch(`${apiUrl}/player/getBalance`, {
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
    console.error("Error fetching balance:", error);
    throw error;
  }
}
