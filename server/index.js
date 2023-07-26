require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require("./routes");

const app = express();
const port = process.env.PORT || 3001

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

//Router
app.use("/", router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});