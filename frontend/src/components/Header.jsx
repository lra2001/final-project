import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Header() {
  const [query, setQuery] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Pre-fill search bar from URL
  useEffect(() => {
    setQuery(searchParams.get("search") || "");
  }, [searchParams]);

  // Debounce: update URL 500ms after user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      const currentParams = Object.fromEntries(searchParams.entries());
      navigate({
        pathname: "/",
        search: new URLSearchParams({
          ...currentParams,
          search: query,
          page: 1, // reset pagination
        }).toString(),
      });
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(query)}&page=1`);
  };

  return (
    <header className="d-flex justify-content-between align-items-center bg-dark text-light p-3 border-bottom">
      <h3 className="m-0">GameHub</h3>

      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search 895,920 games"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-outline-info" type="submit">
          Search
        </button>
      </form>

      <div className="d-flex gap-3">
        <button className="btn btn-outline-light btn-sm">Login</button>
        <button className="btn btn-info btn-sm">Sign Up</button>
      </div>
    </header>
  );
}