require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
<<<<<<< HEAD
const PORT = process.env.PORT || 5000;
=======
>>>>>>> 910ea43 (backend)

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/patient', require('./routes/patient'));
// Add other routes...

// Database & Server
connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
<<<<<<< HEAD
// At end of server.js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
=======
>>>>>>> 910ea43 (backend)
});