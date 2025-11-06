import { useEffect, useState } from "react";
import { fetchGames } from "../services/rawg";
import GameCard from "../components/GameCard";

export default function Games({ searchQuery }) {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [ordering, setOrdering] = useState("-rating");
  const [platform, setPlatform] = useState("");
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

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
      setLoading(false);
    }
    loadGames();
  }, [page, ordering, platform, searchQuery]);

  return (
    <div className="container mt-4 text-light">
      <h2>Games</h2>

      <div className="d-flex gap-3 mb-3">
        <select className="form-select w-auto" value={ordering} onChange={(e) => setOrdering(e.target.value)}>
          <option value="-rating">Top Rated</option>
          <option value="name">A–Z</option>
          <option value="-released">Newest</option>
          <option value="released">Oldest</option>
        </select>

        <select className="form-select w-auto" value={platform} onChange={(e) => setPlatform(e.target.value)}>
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
        <div className="d-flex flex-wrap gap-3 justify-content-center">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}

      <div className="d-flex justify-content-center gap-2 mt-4">
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

// import { useEffect, useState } from "react";
// import { fetchGames } from "../services/rawg";

// export default function Games() {
//   const [games, setGames] = useState([]);
//   const [page, setPage] = useState(1);
//   const [nextPage, setNextPage] = useState(null);
//   const [prevPage, setPrevPage] = useState(null);

//   useEffect(() => {
//     async function loadGames() {
//       const data = await fetchGames("", page, 10);
//       setGames(data.results);
//       setNextPage(data.next);
//       setPrevPage(data.previous);
//     }
//     loadGames();
//   }, [page]);

//   return (
//     <div>
//       <h1>Games</h1>
//       <div className="d-flex flex-wrap gap-3">
//         {games.map((game) => (
//           <div key={game.id} className="card p-2" style={{ width: "200px" }}>
//             <img src={game.background_image} alt={game.name} className="card-img-top" />
//             <div className="card-body">
//               <h5 className="card-title">{game.name}</h5>
//               <p>Rating: {game.rating}</p>
//               <p>Platforms: {game.platforms.map(p => p.platform.name).join(", ")}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="d-flex justify-content-center gap-2 mt-3">
//         {prevPage && (
//           <button className="btn btn-secondary" onClick={() => setPage(page - 1)}>
//             Previous
//           </button>
//         )}
//         {nextPage && (
//           <button className="btn btn-secondary" onClick={() => setPage(page + 1)}>
//             Next
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }