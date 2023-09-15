import { useState, useEffect } from "react";
import { gsap } from "gsap";
import "./YouTubeMusic.scss"; // Create a new styling file for this component

export default function YouTubeMusic() {
  const [songs, setSongs] = useState([]);
  const API_KEY = "AIzaSyBmqKKXiqPbhj-UYRE846jjrVIWu7iNXBQ";
  const PLAYLIST_ID = "PLDVWnPbjP8NIiwGCGxMTGHJljJQ-MKbs4";

  useEffect(() => {
    async function fetchSongs() {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${API_KEY}`
        );
        const data = await response.json();
        const latestSongs = data.items.slice(-50).reverse();
        setSongs(latestSongs);
      } catch (error) {
        console.error("Error fetching the songs:", error);
      }
    }

    fetchSongs();
  }, []);

  const handleScroll = (e) => {
    e.preventDefault();
    const container = e.currentTarget;
    const amount = e.deltaY > 0 ? 10 : -10;
    gsap.to(container, { scrollLeft: "+=" + amount, duration: 0.5 });
  };

  return (
    <div className="YouTubeMusic-component-container" onWheel={handleScroll}>
      <div className="new-songs-container">
        {" "}
        {songs.map((song) => (
          <div className="iframe-wrapper">
            <iframe
              key={song.snippet.resourceId.videoId}
              width="450"
              height="300"
              src={`https://www.youtube.com/embed/${song.snippet.resourceId.videoId}`}
              title={song.snippet.title}
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
