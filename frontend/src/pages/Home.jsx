import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchGames } from "../services/rawg";
import GameCard from "../components/GameCard";

export default function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Read parameters from URL
  const searchQuery = searchParams.get("search") || "";
  const ordering = searchParams.get("ordering") || "-rating";
  const platform = searchParams.get("platform") || "";
  const page = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    async function loadGames() {
      setLoading(true);
      const data = await fetchGames({
        search: searchQuery,
        ordering,
        platforms: platform,
        page,
      });
      setGames(data.results || []);
      setNextPage(data.next);
      setPrevPage(data.previous);
      setTotalPages(Math.ceil((data.count || 0) / 10));
      setLoading(false);
    }
    loadGames();
  }, [searchQuery, ordering, platform, page]);

  function handleFilterChange(key, value) {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    newParams.set("page", "1"); // reset pagination when filters change
    setSearchParams(newParams);
  }

  function handlePageChange(newPage) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage);
    setSearchParams(newParams);
  }

  return (
    <div className="container mt-4 text-light">
      <h2>Explore Games</h2>

      <div className="d-flex gap-3 mb-3">
        <select
          className="form-select w-auto"
          value={ordering}
          onChange={(e) => handleFilterChange("ordering", e.target.value)}
        >
          <option value="-rating">Top Rated</option>
          <option value="name">A-Z</option>
          <option value="-released">Newest</option>
          <option value="released">Oldest</option>
        </select>

        <select
          className="form-select w-auto"
          value={platform}
          onChange={(e) => handleFilterChange("platform", e.target.value)}
        >
          <option value="">All Platforms</option>
          <option value="4">PC</option>
          <option value="187">PlayStation 5</option>
          <option value="1">Xbox One</option>
          <option value="7">Nintendo Switch</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>

          <div className="d-flex justify-content-center gap-2 mt-4 align-items-center">
            {prevPage && (
              <button
                className="btn btn-secondary"
                onClick={() => handlePageChange(page - 1)}
              >
                Previous
              </button>
            )}
            <span>
              Page {page} {totalPages > 0 && `of ${totalPages}`}
            </span>
            {nextPage && (
              <button
                className="btn btn-secondary"
                onClick={() => handlePageChange(page + 1)}
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}