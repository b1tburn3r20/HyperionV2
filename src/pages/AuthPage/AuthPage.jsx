import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./AuthPage.css";
import React, { useEffect, useState } from "react";

import Loading from "react-loading";
import { CSSTransition } from "react-transition-group";

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds (you can replace this with your logic)
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    // Implement your API call logic here and set isLoading to false when done.
  }, []);

  return (
    <main className="auth-page-container">
      <CSSTransition
        in={isLoading}
        timeout={1000}
        classNames="fade-out"
        unmountOnExit
      >
        <div className="loading-container">
          <Loading type={"bubbles"} color={"#000"} />
          {/* blank
balls
bars
bubbles
cubes
cylon
spin
spinningBubbles
spokes
 */}
        </div>
      </CSSTransition>
      <div className="top-container">
        <div className="welcome-note">Welcome to Hyperion v2!</div>
        <div className="welcome-description">
          ~ personal blog and update page of Alejandro Bermudez
        </div>
      </div>
      <div className="middle-container">
        <div className="introduction-header">Joining Hyperion Gives you..</div>
        <div className="introduction-content">
          <ul className="auth-page-middle-container-list-container">
            <li className="auth-page-middle-container-list-item">
              Ability to change themes from 3 different themes and counting..
            </li>
            <li className="auth-page-middle-container-list-item">
              Ability to leave comments on posts
            </li>
            <li className="auth-page-middle-container-list-item">
              Create private messages to me only I can see
            </li>
            <li className="auth-page-middle-container-list-item">
              Potentially even more!
            </li>
          </ul>
        </div>
      </div>
      <div className="bottom-container">
        {showSignUp ? (
          <SignUpForm setUser={setUser} />
        ) : (
          <LoginForm setUser={setUser} />
        )}

        <button
          className="signup-login-toggle"
          onClick={() => setShowSignUp(!showSignUp)}
        >
          {showSignUp ? "Log In" : "Sign Up"}
        </button>
      </div>
    </main>
  );
}
