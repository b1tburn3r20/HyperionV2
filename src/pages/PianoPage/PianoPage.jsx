import React, { useState, useEffect, useContext } from "react";
import TikTokPiano from "../../components/TikTokPiano/TikTokPiano";
import Loading from "react-loading";
import { CSSTransition } from "react-transition-group";

import { ThemeContext } from "../App/App";
import "./PianoPage.css"; // Import the CSS styles for your PianoPage component if needed
export default function PianoPage() {
  const { theme } = useContext(ThemeContext);
  const loadingColor = theme === "dark" || theme === "blue" ? "#FFF" : "#000";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds (you can replace this with your logic)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    // Implement your API call logic here and set isLoading to false when done.
  }, []);

  return (
    <div className="piano-page-container">
      <CSSTransition
        in={isLoading}
        timeout={2000}
        classNames="fade-out"
        unmountOnExit
      >
        <div className="loading-container">
          <div>Loading Piano Page..</div>

          <Loading type={"bars"} color={loadingColor} />
        </div>
      </CSSTransition>
      <div className="piano-page-header">Piano Progress</div>
      <div className="piano-page-description">
        / Welcome to my piano page, here you will see the latest progress i've
        made teaching myself piano via{" "}
        <a href="https://www.tiktok.com/@alejandrobermudez519">tiktoks</a> . /
      </div>
      <TikTokPiano />
    </div>
  );
}
