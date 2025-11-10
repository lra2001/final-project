import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Reviews from "./pages/Reviews";
import Login from "./pages/Login";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <BrowserRouter>
      <Header onSearch={setSearchQuery} />

      <div className="main-layout">
        <Sidebar />

        <div className="page-content">
            <Routes>
              {/* Pass searchQuery down to Home */}
              <Route path="/" element={<Home searchQuery={searchQuery} />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/login" element={<Login />} />
            </Routes>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;