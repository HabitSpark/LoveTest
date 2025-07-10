// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Load environment variables (optional)
require('dotenv').config();

// App setup
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in environment!");
  process.exit(1);
}


// Mongoose schema & model
const loveTestSchema = new mongoose.Schema({
    yourName: { type: String, required: true },
    partnerName: { type: String, required: true },
    percentage: { type: Number, required: true },
    message: { type: String },
    testedAt: {
        type: Date,
        default: Date.now
    }
});
const LoveTest = mongoose.model('LoveTest', loveTestSchema);

app.get('/', (req, res) => {
  res.send('💘 LoveTest API is live and running!');
});

// Route: POST /api/love/test
app.post('/api/love/test', async(req, res) => {
    const { yourName, partnerName } = req.body;

    if (!yourName || !partnerName) {
        return res.status(400).json({ error: 'Both names are required' });
    }

    const percentage = Math.floor(Math.random() * 51) + 50; // 50–100%
    const messages = [
        "You are made for each other!",
        "Love is in the air!",
        "A perfect match!",
        "So sweet together 💖",
        "You both shine together ✨"
    ];
    const message = messages[Math.floor(Math.random() * messages.length)];

    try {
        const newTest = new LoveTest({ yourName, partnerName, percentage, message });
        await newTest.save();
        res.status(200).json({ percentage, message });
    } catch (err) {
        console.error('Error saving to DB:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
