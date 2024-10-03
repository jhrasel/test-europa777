const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export async function fetchBonus() {
  try {
    const response = await fetch(`${apiUrl}/promotionDetails`, {
      next: { revalidate: 60 },
      cache: "force-cache",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching bonus:", error);
    throw error;
  }
}
