const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const path = require("path");

const items = require("./routes/api/items");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");

const app = express();

// Bodyparser middleware
app.use(express.json());

// DB Config
const db = config.get("mongoURI");

// Connect to mongoDB
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => console.log(err));

// Use routes
app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/auth", auth);

// Serve static assets if in production model
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Port num
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
