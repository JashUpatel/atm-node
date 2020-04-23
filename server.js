const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

//It will look for PORT in env else will start on 3000
const PORT = process.env.PORT || 3000;

//Database connection
connectDB();

//enabling cors
app.use(cors());

//Init Middleware
app.use(express.json({ extended: false }));

//Registering Routes
app.use("/api", require("./routes/user"));

//Starting server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
