import { useState, useEffect } from "react";
import { createContext } from "react";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import "./App.css";
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar/NavBar";
import HomePage from "../HomePage/HomePage";
import PianoPage from "../PianoPage/PianoPage";
import UpdatesPage from "../UpdatesPage/UpdatesPage";
import AugmentedRealityPage from "../AugmentedRealityPage/AugmentedRealityPage";
export const ThemeContext = createContext();

export default function App() {
  const [user, setUser] = useState(getUser());
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user && location.pathname === "/auth") {
      navigate("/");
    }
  }, [user, navigate, location.pathname]);

  useEffect(() => {
    // Whenever the theme changes, update the DOM and localStorage
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <main className="App">
        <NavBar user={user} setUser={setUser} />
        {/* You can now use theme and setTheme in any child component using useContext(ThemeContext) */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/piano" element={<PianoPage />} />
          <Route path="/ar" element={<AugmentedRealityPage />} />
          <Route path="/updates-from-me" element={<UpdatesPage />} />
          {!user && (
            <Route path="/auth" element={<AuthPage setUser={setUser} />} />
          )}
        </Routes>
      </main>
    </ThemeContext.Provider>
  );
}
