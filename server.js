const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Set up middleware
app.use(express.json());

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/thoughts', require('./routes/api/thoughts'));
app.use(
  '/api/thoughts/:thoughtId/reactions',
  require('./routes/api/reactions')
);
app.use('/api/users', require('./routes/api/friends'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
