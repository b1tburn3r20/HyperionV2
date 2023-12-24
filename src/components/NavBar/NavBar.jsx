import { useState } from "react";
import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import "./NavBar.css"; // Import the CSS file for the navbar

export default function NavBar({ user, setUser }) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleToggle = () => setIsNavCollapsed(!isNavCollapsed);

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <div className="nav-container">
      <nav className={`navbar ${!isNavCollapsed && "show"}`}>
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/piano" className=" navbar-link">
          Piano
        </Link>
        <Link to="/AR" className="navbar-link">
          Augmented Reality
        </Link>
        <Link to="/updates-from-me" className=" navbar-link">
          Most Recent Updates
        </Link>
        <div className="navbar-link theme-changer ">
          {" "}
          {/* This wraps the ThemeSwitcher in the same style as other navbar links */}
          {user ? (
            <>
              <ThemeSwitcher />
            </>
          ) : (
            <>Login for themes</>
          )}
        </div>
        <div className="navbar-link">
          {user ? (
            <>
              <span className="navbar-user">Logged in as: {user.name}</span>
              <Link to="" onClick={handleLogOut} className="navbar-logout">
                Log Out
              </Link>
            </>
          ) : (
            <Link to="/auth" className="navbar-signup">
              Wanna say hi? Join Here
            </Link>
          )}
        </div>
      </nav>
      <div className="toggle-themeBtn">
        <button className="navbar-toggle" onClick={handleToggle}>
          0
        </button>
      </div>
    </div>
  );
}
