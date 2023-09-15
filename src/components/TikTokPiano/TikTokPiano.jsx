import React, { useState, useEffect } from "react";

import "./TikTokPiano.css";

export default function TikTokPiano() {
  const [urls, setUrls] = useState([
    "https://www.tiktok.com/@alejandrobermudez519/video/7276495938347093290",
    "https://www.tiktok.com/@alejandrobermudez519/video/7276132066809417003",
    "https://www.tiktok.com/@alejandrobermudez519/video/7275752464157019434",
    "https://www.tiktok.com/@alejandrobermudez519/video/7275432052680346923",

    // add more URLs here
  ]);

  const [embedHtml, setEmbedHtml] = useState(null);

  useEffect(() => {
    // Fetch the embed code from TikTok's oEmbed API
    async function fetchEmbedCode() {
      const embedHtmlArray = [];
      for (const url of urls) {
        try {
          const response = await fetch(
            `https://www.tiktok.com/oembed?url=${url}`
          );
          const data = await response.json();
          embedHtmlArray.push(data.html);
        } catch (error) {
          console.error("Failed to fetch the embed code:", error);
        }
      }
      setEmbedHtml(embedHtmlArray);
    }

    fetchEmbedCode();
  });
  useEffect(() => {
    if (embedHtml) {
      const script = document.createElement("script");
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [embedHtml]);

  return (
    <>
      {embedHtml &&
        embedHtml.map((html, index) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: html }} />
        ))}
    </>
  );
}
