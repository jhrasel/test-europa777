import Cookies from "js-cookie";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export async function fetchLockByBonus() {
  const token = Cookies.get("token");

  try {
    const response = await fetch(`${apiUrl}/player/getProfile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60 }, 
      cache: "no-store", 
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching lock by bonus:", error);
    throw error;
  }
}

// export async function fetchLockByBonus() {
//   const token = Cookies.get("token");

//   try {
//     const response = await fetch(`${apiUrl}/player/lockByBonus`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "X-Requested-With": "XMLHttpRequest",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message || "Something went wrong");
//     }

//     return response.json();
//   } catch (error) {
//     console.error("Error fetching lock by bonus:", error);
//     throw error;
//   }
// }
