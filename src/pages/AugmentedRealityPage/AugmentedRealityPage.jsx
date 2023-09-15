import React, { useEffect, useState, useContext } from "react";
import Loading from "react-loading";
import { CSSTransition } from "react-transition-group";

import "./AugmentedRealityPage.css";
import { ThemeContext } from "../App/App";
export default function AugmentedRealityPage() {
  const { theme } = useContext(ThemeContext);
  const loadingColor = theme === "dark" || theme === "blue" ? "#FFF" : "#000";
  const [videos, setVideos] = useState([]);
  const API_KEY = "AIzaSyBmqKKXiqPbhj-UYRE846jjrVIWu7iNXBQ";
  const PLAYLIST_ID = "PLDVWnPbjP8NKBrJvgCWSiIsdQSDbMvnf5";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${API_KEY}`
        );
        const data = await response.json();
        const latestVideos = data.items.slice(-50).reverse();
        setVideos(latestVideos);
      } catch (error) {
        console.error("Error fetching the videos:", error);
      }
    }
    fetchVideos();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <div className="augmented-reality-page-container">
      <CSSTransition
        in={isLoading}
        timeout={2000}
        classNames="fade-out"
        unmountOnExit
      >
        <div className="loading-container">
          <div>Loading AR Page..</div>

          <Loading type={"balls"} color={loadingColor} />
        </div>
      </CSSTransition>
      <div className="augmented-reality-page-header">Augmented Reality</div>
      <div className="augmented-reality-page-description">
        Welcome to my page on my progress with augmented reality, here you will
        see all my progress related to working with augmented reality, so far im
        on a project I have yet to name, but the idea of it is creating and
        programming mobile headgear for transparent visual passthrough to see
        object detection.
      </div>
      <div className="youtube-and-notes-container">
        <div className="notes-container">yoyoyo</div>
        <div className="recent-posts-from-youtube">
          <div className="new-videos-container">
            {" "}
            {videos.map((video) => (
              <div className="iframe-wrapper">
                <iframe
                  key={video.snippet.resourceId.videoId}
                  width="450"
                  height="300"
                  src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
                  title={video.snippet.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
