const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const items = require("./routes/api/items");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").MongoURI;

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// Use Routes
app.use("/api/items", items);

// Serve static assest if in production
if (process.env.NODE_ENV === "production") {
  // Select static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// PORT
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on PORT ${port} `));
