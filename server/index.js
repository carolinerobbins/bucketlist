require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require("./routes");

const app = express();
const port = process.env.PORT || 3001

app.use(cors());
app.use(express.json());

app.use("/flights", router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});