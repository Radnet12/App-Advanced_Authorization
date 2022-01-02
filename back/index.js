require("dotenv").config();

// Modules
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Variables
const PORT = process.env.PORT || 5000;

const app = express();

const startServer = () => {
    try {
        app.listen(PORT, () =>
            console.log(`Server started on the PORT = ${PORT}`)
        );
    } catch (e) {
        console.log(e);
    }
};

startServer();
