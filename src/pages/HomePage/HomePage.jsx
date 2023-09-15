import { useState, useEffect, useContext } from "react";
import "./HomePage.css";
import YouTubeVideo from "../../components/YouTubeVideo/YouTubeVideo";
import YouTubeMusic from "../../components/YouTubeMusic/YouTubeMusic";

import Loading from "react-loading"; // Import the loading component
import { CSSTransition } from "react-transition-group";

import { ThemeContext } from "../App/App";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true); // State to keep track of loading state
  const { theme } = useContext(ThemeContext);
  const loadingColor = theme === "dark" || theme === "blue" ? "#FFF" : "#000";

  useEffect(() => {
    // Disable scrolling when component mounts and is loading
    window.scrollTo(0, 0);

    document.body.style.overflow = "hidden";

    // Reset the viewer's position to the top

    // Mock delay to represent API call
    setTimeout(() => {
      setIsLoading(false); // Turn off loading after data is 'fetched'
    }, 7000); // 7 seconds delay, replace with your actual API call logic

    // Cleanup function to re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };

    // Implement your API call logic here and set isLoading to false when done.
  }, []);

  useEffect(() => {
    if (!isLoading) {
      document.body.style.overflow = "auto"; // Re-enable scrolling when loading completes
    }
  }, [isLoading]);

  return (
    <div className="home-page-container">
      <CSSTransition
        in={isLoading}
        timeout={5000}
        classNames="fade-out"
        unmountOnExit
      >
        <div className="loading-container">
          <div>Loading Homepage..</div>
          <Loading type={"cylon"} color={loadingColor} />
        </div>
      </CSSTransition>
      <div className="home-page-header">Hyperion v2</div>
      <div className="home-page-whats-new">
        <div className="whats-new-header">Whats New?</div>
        <div className="home-page-new-music">
          <div className="home-page-new-music-header">
            Music I like, good stuff...
          </div>
          <div className="new-songs-container">
            <YouTubeMusic />
          </div>
        </div>
        <div className="home-page-new-videos">
          <div className="home-page-new-videos-header">
            Videos worth watching! (Probably...)
          </div>
          <div className="new-videos-container">
            <YouTubeVideo />
          </div>
        </div>
        <div className="who-am-i-header">Who am I?</div>
        <div className="end-of-page-goods">
          <div className="who-am-i-container">
            <div className="who-am-i-description">
              I'm just a guy who likes obscure music, watches YouTube and works
              at a Walgreens. I love to code, I built this website as a side
              project to post more updates on me so others could see whats goin'
              on with me. I am learning piano, check out my progress in the
              Piano tab in the Navbar. I am learning some tinkering too right
              now building A.R object detection passthrough headgear, check that
              out by clicking the Augmented Reality tab in the Navbar. Like the
              music, videos, songs posts or anything you want to comment on,
              maybe just to say "hi". Sign up and simply drop a comment. Enjoy
              your stay.
            </div>
            <div className="image-me-container">
              <img
                className="image-me"
                src="/images/stickbro.png"
                alt="an image of a stickman"
              />
              <div className="image-me-text">(real image of me)</div>
            </div>
          </div>
          <div className="but-i-am-also-header">More on me...</div>

          <div className="but-i-am-also-container">
            <div className="image-me-container"></div>
            <div className="but-i-am-also-description">
              I developed a love for coding as I realized my creative potential.
              I love to solve problems and see the world a new way. I love
              studio ghibli, im a big fan of digital design, piano, augmented
              and virtual reality and I love to listen and talk about it with
              other passionate people. I know HTML and CSS fluently, I can use
              and program in javascript and python as they're my main
              programming languages for websites and leetcode respectively. Im a
              top .1% nationwide ex-competetive fps gamer and I love to learn. I
              teach myself everything I know mostly with exception to a few
              things. But I think if you want to learn something the internet is
              your best friend. Currently i'm teaching myself data systems,
              augmented reality, piano and of course, programming. Overall im a
              passionate problem solver who dreams big and does his best to
              realize those dreams.
            </div>
          </div>
          <div className="who-am-i-header">My Dream</div>
          <div className="end-of-page-goods">
            <div className="who-am-i-container">
              <div className="who-am-i-description">
                Im a strong believer that we only live once and to make the best
                of it, what cool things can you bring to life in your time,
                whats stopping you from getting started, what do you want to
                accomplish? start now or let fate decide for you. I believe
                computers are our key to reaching new heights. Using cameras as
                eyes, microphones as ears and speakers as mouthes. I think
                computers and humans are not so different so why treat them as
                such, harnessing this untapped potential is what seperates us
                from the future. I think hopefully my actions will someday soon
                back my words as I work towards bridging the gap between the
                digital and real world.
              </div>
              <div className="image-me-container">
                <img
                  className="image-me"
                  src="/images/code-slash.svg"
                  alt="an image of a stickman"
                />
                <div className="image-me-text">
                  (code brackets because coding)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
