require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./routes/users");
const interestRoutes = require("./routes/interest");
const postRoutes = require("./routes/posts");
const profileRoutes = require("./routes/profile");
const searchRoutes = require("./routes/search");
const cors = require("cors");
const session = require("express-session");
const PORT = process.env.PORT || 8080;

// app.use(
//   cors({
//     credentials: true,
//     origin: process.env.CORS_ORIGIN_DEV,
//     methods: ["GET", "POST"],
//   })
// );

app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"],
  })
);

app.use(
  session({
    secret: "expelliarmus alohomora",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/interests", interestRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/search", searchRoutes);
app.post("/", (req, res) => {
  console.log(req.body);
  res.send("hello world!");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
