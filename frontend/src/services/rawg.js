const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

export async function fetchGames({ search = "", ordering = "", platforms = "", page = 1, pageSize = 10 }) {
  try {
    const params = new URLSearchParams({
      key: API_KEY,
      page,
      page_size: pageSize,
    });

    if (search) params.append("search", search);
    if (ordering) params.append("ordering", ordering);
    if (platforms) params.append("platforms", platforms);

    const res = await fetch(`${BASE_URL}/games?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch games");
    return await res.json();
  } catch (error) {
    console.error("RAWG API error:", error);
    return { results: [] };
  }
}

// export async function fetchGames(query = "", page = 1, pageSize = 10) {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/games?key=${API_KEY}&search=${query}&page=${page}&page_size=${pageSize}`
//     );
//     if (!response.ok) throw new Error("Failed to fetch games");
//     const data = await response.json();
//     return {
//       results: data.results,
//       next: data.next,
//       previous: data.previous
//     };
//   } catch (error) {
//     console.error(error);
//     return { results: [], next: null, previous: null };
//   }
// }