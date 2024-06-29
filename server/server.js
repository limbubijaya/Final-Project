require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;

app.use(
    cors({
        credentials: true,
        origin: process.env.CORS_ORIGIN,
        methods: ["GET", "POST"],
    })
);

app.get("/" , (req, res) => {
    
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})
