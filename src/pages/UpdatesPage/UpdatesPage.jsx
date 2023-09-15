import React, { useEffect, useState, useContext } from "react";
import * as userService from "../../utilities/users-service";
import sendRequest from "../../utilities/send-request";
import Loading from "react-loading";
import { CSSTransition } from "react-transition-group";
import moment from "moment-timezone";

import { ThemeContext } from "../App/App";
import "./UpdatesPage.css";

function getColorByHashtag(hashtag, hashtags) {
  const tag = hashtags.find((tag) => tag.name === hashtag);
  return tag ? tag.color : "#FFFFFF"; // Default to white if not found
}

function UpdatesPage() {
  const { theme } = useContext(ThemeContext);
  const loadingColor = theme === "dark" || theme === "blue" ? "#FFF" : "#000";
  const [user, setUser] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedHashtag, setSelectedHashtag] = useState("anything else");
  const [feedback, setFeedback] = useState("");
  const [posts, setPosts] = useState([]); // state to store posts
  const [isLoading, setIsLoading] = useState(true);

  const hashtags = [
    { name: "augmented reality", color: "#E57373" },
    { name: "jobs", color: "#F58D11" },
    { name: "leetcode", color: "#64B5F6" },
    { name: "webdev", color: "#1A96F6" },
    { name: "piano", color: "#BA68C8" },
    { name: "ideas", color: "#84D07D" },
    { name: "coding", color: "#7986CB" },
    { name: "anything else", color: "" },
  ];

  useEffect(() => {
    // Simulate loading for 2 seconds (you can replace this with your logic)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    // Implement your API call logic here and set isLoading to false when done.
  }, []);
  useEffect(() => {
    const currentUser = userService.getUser();
    setUser(currentUser);
    fetchPosts(); // fetch posts when component mounts
  }, []);

  async function fetchPosts() {
    try {
      const data = await sendRequest("/api/updates", "GET");
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setFeedback("Error fetching posts. Please refresh the page.");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault(); // prevent default form submission behavior

    try {
      const post = await sendRequest("/api/updates", "POST", {
        content: inputValue,
        hashtag: selectedHashtag,
      });
      setPosts([post, ...posts]); // prepend new post to list
      setInputValue("");
      setSelectedHashtag("anything else");
      setFeedback("Post successfully created!");
    } catch (error) {
      console.error("Error creating post:", error);
      setFeedback("Error creating post. Please try again.");
    }
  }
  function formatDateToChicago(dateString) {
    return moment(dateString)
      .tz("America/Chicago")
      .format("MMMM D, YYYY, h:mm:ss a");
  }

  return (
    <div className="updates-page-container">
      <CSSTransition
        in={isLoading}
        timeout={2000}
        classNames="fade-out"
        unmountOnExit
      >
        <div className="loading-container">
          <div>Loading Updates..</div>

          <Loading type={"spinningBubbles"} color={loadingColor} />
        </div>
      </CSSTransition>
      <div className="updates-page-header">Recent Updates</div>
      <div className="updates-page-description">
        Welcome to my updates page, here you can find the latest on whatever it
        is im up to. Each update is color coded based on a specific category of
        relation, except for one category: "#anything else", which has no color
        background.
      </div>
      {feedback && <p className="feedback-message">{feedback}</p>}
      {user && user.role === "admin" && (
        <div className="admin-welcome-message">Hows it goin, bro?</div>
      )}
      {user && user.role === "admin" && (
        <form className="post-form" onSubmit={handleSubmit}>
          <textarea
            className="post-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Write an update..."
            rows="1" // Set an initial number of rows (1 in this case)
            style={{ resize: "vertical" }} // Allow vertical resizing
          />

          <select
            className="hashtag-select"
            value={selectedHashtag}
            onChange={(e) => setSelectedHashtag(e.target.value)}
          >
            {hashtags.map((tag) => (
              <option
                className="hashtag-option"
                key={tag.name}
                value={tag.name}
                style={{ background: tag.color }}
              >
                {tag.name}
              </option>
            ))}
          </select>
          <button className="send-button" type="submit">
            Send
          </button>
        </form>
      )}

      <div className="posts-list">
        {posts.map((post) => (
          <div
            key={post._id}
            className="post-item"
            style={{
              backgroundColor: `${getColorByHashtag(post.hashtag, hashtags)}33`, // 33 is the opacity for .3 in hex
            }}
          >
            <div className="post-username">Alejandro</div>
            <div className="post-content">{post.content}</div>
            <div className="post-bottom-container">
              <div className="post-hashtag">#{post.hashtag}</div>
              <div className="post-date">{formatDateToChicago(post.date)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpdatesPage;
