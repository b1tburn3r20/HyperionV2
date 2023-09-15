import { useState, useEffect } from "react";
import { gsap } from "gsap";
import "./YouTubeVideo.scss";

export default function YouTubeVideo() {
  const [videos, setVideos] = useState([]);
  const API_KEY = "AIzaSyBmqKKXiqPbhj-UYRE846jjrVIWu7iNXBQ";
  const PLAYLIST_ID = "PLDVWnPbjP8NJVUeUp30jmybOnfB78ZEY_";

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

  const handleScroll = (e) => {
    e.preventDefault();
    const container = e.currentTarget;
    const amount = e.deltaY > 0 ? 10 : -10; // Adjust the value for faster/slower scroll
    gsap.to(container, { scrollLeft: "+=" + amount, duration: 0.5 }); // Using gsap for smooth scroll effect
  };

  return (
    <div className="YouTubeVideo-component-container" onWheel={handleScroll}>
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
  );
}
