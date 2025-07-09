// client/src/components/EmojiRain.jsx
import React, { useEffect, useState } from "react";
import "./EmojiRain.css";

const emojiSets = {
  low: ["💪", "🥲", "🧠", "⚒️"],
  high: ["🥳", "🎉", "❤️", "🚀"]
};

function EmojiRain({ type }) {
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEmoji = {
        emoji: emojiSets[type][Math.floor(Math.random() * emojiSets[type].length)],
        left: Math.random() * 100
      };
      setEmojis((prev) => [...prev.slice(-20), newEmoji]);
    }, 300);
    return () => clearInterval(interval);
  }, [type]);

  return (
    <div className="emoji-rain">
      {emojis.map((e, i) => (
        <span
          key={i}
          className="emoji"
          style={{ left: `${e.left}%` }}
        >
          {e.emoji}
        </span>
      ))}
    </div>
  );
}

export default EmojiRain;
