import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100 px-4">
            <NavLink className="navbar-brand" to="/">GameHub</NavLink>

            <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/games">Games</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/reviews">Reviews</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>
                </ul>
            </div>
        </nav >
    );
}