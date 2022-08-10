// require('dotenv').config();
const express = require('express');
// const swaggerUI = require("swagger-ui-express");
// const swaggerJsDoc = require("swagger-jsdoc");
const app = express();

app.use("/",require("./data.js"))

const port = process.env.PORT || 3009

app.listen(port, () => {
    console.log(`Server is running on this port no ${port}`);
});

