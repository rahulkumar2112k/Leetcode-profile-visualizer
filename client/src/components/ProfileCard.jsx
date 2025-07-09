import React from "react";
import "./ProfileCard.css";

const CircleStat = ({ label, solved, total, color }) => {
  const radius = 45;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = (solved / total) * 100;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="circle-stat">
      <svg height="100" width="100">
        <circle
          stroke="#eee"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx="50"
          cy="50"
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx="50"
          cy="50"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
        <text x="50" y="55" textAnchor="middle" fontSize="16" fill="#333">
          {solved}
        </text>
      </svg>
      <span>{label}</span>
    </div>
  );
};

const ProfileCard = ({ data }) => {
  const maxEasy = 800;
  const maxMedium = 1200;
  const maxHard = 600;

  return (
    <div className="profile-card">
      <img src={data.avatar} alt="User Avatar" className="avatar" />
      <h2>{data.profile.realName || data.username}</h2>
      <p className="country">🌍 {data.countryName}</p>
      <p className="rank">🏆 Global Rank: {data.ranking}</p>

      <div className="total-solved">
        <h3>Total Solved</h3>
        <p>{data.totalSolved} Problems</p>
      </div>

      <div className="circle-stats-container">
        <CircleStat
          label="Easy"
          solved={data.easySolved}
          total={maxEasy}
          color="#00b894"
        />
        <CircleStat
          label="Medium"
          solved={data.mediumSolved}
          total={maxMedium}
          color="#fdcb6e"
        />
        <CircleStat
          label="Hard"
          solved={data.hardSolved}
          total={maxHard}
          color="#d63031"
        />
      </div>
    </div>
  );
};

export default ProfileCard;
