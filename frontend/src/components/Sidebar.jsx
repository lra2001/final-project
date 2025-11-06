import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const links = [
    { to: "/", icon: "bi-house-door", label: "Home" },
    { to: "/dashboard", icon: "bi-speedometer2", label: "Dashboard" },
    { to: "/games", icon: "bi-controller", label: "Games" },
    { to: "/reviews", icon: "bi-chat-left-text", label: "Reviews" },
    { to: "/login", icon: "bi-person", label: "Login" },
  ];

  return (
    <>
      {/* Toggle button (only visible on mobile) */}
      <button
        className="btn btn-outline-light d-lg-none m-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="bi bi-list fs-3"></i>
      </button>

      {/* Sidebar */}
      <aside
        className={`sidebar bg-dark text-light d-flex flex-column flex-shrink-0 p-3 border-end border-secondary
          ${isOpen ? "open" : "closed"}`}
      >
        <div className="d-flex align-items-center mb-4">
          <i className="bi bi-joystick text-info me-2 fs-4"></i>
          <span className="fs-5 fw-semibold">Menu</span>
        </div>

        <ul className="nav nav-pills flex-column mb-auto">
          {links.map((link) => (
            <li key={link.to} className="nav-item mb-1">
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center ${
                    isActive ? "active bg-info text-dark" : "text-light"
                  }`
                }
                onClick={() => setIsOpen(false)} // auto-close on mobile
              >
                <i className={`bi ${link.icon} me-2 fs-5`}></i>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <button className="btn btn-outline-info w-100">
            <i className="bi bi-box-arrow-right me-2"></i>Logout
          </button>
        </div>
      </aside>
    </>
  );
}