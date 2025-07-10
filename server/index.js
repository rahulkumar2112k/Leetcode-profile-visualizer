const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const apiURL = process.env.LEETCODE_API;

// Middleware
app.use(cors());
app.use(express.json());

// API Route
app.post('/api/profile', async (req, res) => {
const { username } = req.body;

const query = {
query: `
query getUserProfile($username: String!) {
matchedUser(username: $username) {
username
profile {
realName
ranking
userAvatar
countryName
}
submitStatsGlobal {
acSubmissionNum {
difficulty
count
}
}
}
}
`,
variables: { username },
};

try {

const response = await axios.post(apiURL, query, {
headers: { 'Content-Type': 'application/json' },
});

res.json(response.data);
} catch (error) {
console.error(error.message);
res.status(500).json({ error: 'Failed to fetch LeetCode data' });
}
});

// 🟢 Serve frontend static files (after API routes)
if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
}

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`✅ Server running at http://localhost:${PORT}`);
});