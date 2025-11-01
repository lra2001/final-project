const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

export async function fetchGames(query = "", page = 1, pageSize = 10) {
  try {
    const response = await fetch(
      `${BASE_URL}/games?key=${API_KEY}&search=${query}&page=${page}&page_size=${pageSize}`
    );
    if (!response.ok) throw new Error("Failed to fetch games");
    const data = await response.json();
    return {
      results: data.results,
      next: data.next,
      previous: data.previous
    };
  } catch (error) {
    console.error(error);
    return { results: [], next: null, previous: null };
  }
}