import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Games from "./pages/Games";
import Reviews from "./pages/Reviews";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout d-flex">
        <Sidebar />

        <div className="main-content flex-grow-1 d-flex flex-column min-vh-100">
          <Header />

          <main className="flex-fill bg-dark text-light p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/games" element={<Games />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

// Test fetching API messages

// import { useEffect, useState } from "react";

// function App() {
//   const [messages, setMessages] = useState([]);
//   const endpoints = ["/core/core/", "/games/games", "/users/users", "/dashboard/dashboard", "/reviews/reviews"];

//   useEffect(() => {

//     Promise.all(
//       endpoints.map((url) =>
//         fetch(url)
//             .then((res) => {
//                 if (!res.ok) {
//                     return new Error(`Request to URL ${url} failed with status ${res.status}`);
//                 }
//                 return res.json();
//             })
//             .then((data) => ({ url, message: data.message }))
//             .catch((error) => ({ url, message: `Error: ${error.message}` }))
//         )
//     )
//     .then((results) => setMessages(results))
//     .catch((err) => console.error("Unexpected error fetching endpoints:", err));
//   }, []);

//   return (
//     <div>
//         <h1>API Messages:</h1>
//         <ul>
//             {messages.map((item, index) => (
//                 <li key={index}>
//                     <strong>{item.url}:</strong> {item.message}
//                 </li>
//             ))}
//         </ul>
//     </div>
//   );
// }

// export default App;