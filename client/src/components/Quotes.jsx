import React, { useEffect, useState } from "react";
import "./Quotes.css";

const quotes = [
  "Success is the sum of small efforts, repeated day in and day out.",
  "Keep pushing forward, even when it's hard.",
  "Every problem you solve brings you closer to mastery.",
  "Consistency is what transforms average into excellence.",
  "Debug your doubts, compile your confidence.",
  "Great coders weren't born, they practiced and failed too.",
  "You don’t have to be great to start, but you have to start to be great.",
  "Challenges are opportunities in disguise.",
  "The only way to learn to code is by writing more code.",
];

function Quotes() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
  }, []);

  return <div className="quote">{quote}</div>;
}

export default Quotes;
