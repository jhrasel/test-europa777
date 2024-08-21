const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export async function fetchTopGames() {
  const result = await fetch(`${apiUrl}/getTopGames`);

  return result.json();
}

export async function fetchHotGames() {
  const result = await fetch(`${apiUrl}/getHotGames`);

  return result.json();
}


export async function fetchLiveCasinoGames() {
  const result = await fetch(`${apiUrl}/getLiveGames`);

  return result.json();
}

export async function fetchGameWinner() {
  const result = await fetch(`${apiUrl}/latestWinners`);

  return result.json();
}

export async function fetchAllGameProviders() {
  const result = await fetch(`${apiUrl}/getAllGameProviders`);

  return result.json();
}