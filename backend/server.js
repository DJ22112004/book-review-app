const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Load environment variables and connect to the database
dotenv.config();
connectDB();

const app = express();

// --- The Only CORS Configuration You Need ---
// This is the correct URL from your error message. Note the 'h' and 'l', not 'b' and '1'.
const frontendURL = 'https://book-review-ejxh32n6l-dhananjay-gaurs-projects.vercel.app';

app.use(cors({
  origin: frontendURL
}));
// --- End of CORS Configuration ---


// Middleware to parse JSON bodies
app.use(express.json());

// Simple route to check if the API is running
app.get('/', (req, res) => {
  res.send('API is running successfully!');
});

// Mount your API routes
app.use('/api/users', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`🚀 Server running on port ${PORT}`));