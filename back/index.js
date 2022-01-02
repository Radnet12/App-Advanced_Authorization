require("dotenv").config();

// Modules
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

// Routers
const router = require("./router/router.js");

// Variables
const PORT = process.env.PORT || 5000;

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api", router);

const startServer = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        app.listen(PORT, () =>
            console.log(`Server started on the PORT = ${PORT}`)
        );
    } catch (e) {
        console.log(e);
    }
};

startServer();
