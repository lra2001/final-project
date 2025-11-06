import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ onSearch }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
    navigate("/games");
  };

  return (
    <header className="d-flex justify-content-between align-items-center bg-dark text-light p-3 border-bottom">
      <div className="d-flex align-items-center gap-2">
        <h3 className="m-0">GameHub</h3>
      </div>

      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search 895,920 games"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-outline-info" type="submit">Search</button>
      </form>

      <div className="d-flex gap-3">
        <button className="btn btn-outline-light btn-sm">Login</button>
        <button className="btn btn-info btn-sm">Sign Up</button>
      </div>
    </header>
  );
}