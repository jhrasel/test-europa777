const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export async function fetchBonus() {
  const result = await fetch(`${apiUrl}/promotionDetails`);

  return result.json();
}
