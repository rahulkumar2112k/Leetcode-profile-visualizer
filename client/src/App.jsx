import React, { useState } from "react";
import "./App.css";
import ProfileCard from "./components/ProfileCard";
import EmojiRain from "./components/EmojiRain";
import Quotes from "./components/Quotes";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setError("");
    setUserData(null);
    setLoading(true);
    try {
      const res = await fetch("https://leetcode-profile-card.onrender.com/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      if (res.ok && data?.data?.matchedUser) {
        const user = data.data.matchedUser;

        const processed = {
          username: user.username,
          profile: user.profile,
          avatar: user.profile.userAvatar,
          countryName: user.profile.countryName,
          ranking: user.profile.ranking,
          totalSolved:
            user.submitStatsGlobal.acSubmissionNum.find((d) => d.difficulty === "All")?.count || 0,
          easySolved:
            user.submitStatsGlobal.acSubmissionNum.find((d) => d.difficulty === "Easy")?.count || 0,
          mediumSolved:
            user.submitStatsGlobal.acSubmissionNum.find((d) => d.difficulty === "Medium")?.count || 0,
          hardSolved:
            user.submitStatsGlobal.acSubmissionNum.find((d) => d.difficulty === "Hard")?.count || 0,
        };

        setUserData(processed);
      } else {
        setError("User not found or invalid username.");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>LeetCode Profile Viewer</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter LeetCode username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleFetch} disabled={loading || !username.trim()}>
          {loading ? "Fetching..." : "Search"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {/* 🎉 Emoji rain based on totalSolved */}
      {userData && userData.totalSolved < 100 && <EmojiRain type="low" />}
      {userData && userData.totalSolved >= 300 && <EmojiRain type="high" />}

      {userData && <ProfileCard data={userData} />}
      {userData && <Quotes />}
    </div>
  );
}

export default App;
