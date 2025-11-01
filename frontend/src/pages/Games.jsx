import { useEffect, useState } from "react";
import { fetchGames } from "../services/rawg";

export default function Games() {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  useEffect(() => {
    async function loadGames() {
      const data = await fetchGames("", page, 10);
      setGames(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
    }
    loadGames();
  }, [page]);

  return (
    <div>
      <h1>Games</h1>
      <div className="d-flex flex-wrap gap-3">
        {games.map((game) => (
          <div key={game.id} className="card p-2" style={{ width: "200px" }}>
            <img src={game.background_image} alt={game.name} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{game.name}</h5>
              <p>Rating: {game.rating}</p>
              <p>Platforms: {game.platforms.map(p => p.platform.name).join(", ")}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center gap-2 mt-3">
        {prevPage && (
          <button className="btn btn-secondary" onClick={() => setPage(page - 1)}>
            Previous
          </button>
        )}
        {nextPage && (
          <button className="btn btn-secondary" onClick={() => setPage(page + 1)}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}