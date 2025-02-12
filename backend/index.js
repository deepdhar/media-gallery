const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
require('dotenv').config();

const app = express();
// app.use(cors({ origin: '*' }));
app.use(cors({
  origin: 'https://media-gallery-one.vercel.app',
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.options('*', cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth')); // Auth routes
app.use('/api/media', require('./routes/media')); // Media routes

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});