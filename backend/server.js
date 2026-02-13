const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const apiRoutes = require('./routes/api.routes');

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Allow requests from anywhere (for embed script)
app.use(express.json());

// Serve the embed script statically
app.use('/widget', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', apiRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));