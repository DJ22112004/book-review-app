const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // To accept JSON data in the body

const frontendURL = 'https://book-review-app-sigma.vercel.app/'; // Must be perfect!
app.use(cors({ origin: frontendURL }));

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Mount Routers
app.use('/api/users', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`🚀 Server running on port ${PORT}`));