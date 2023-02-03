const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

//Routes import
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const portfolio = require("./routes/portfolio");
const watchlist = require("./routes/watchlist");

//DB connection
mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Error:", err.message);
  });

//Routes
app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/watchlist", watchlist);
app.use("/api/v1/portfolio", portfolio);


app.get("/", (req, res) => {
  res.send("Invalid Endpoint");
});

const port = process.env.PORT || 8500;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
