const userRoutes = require('./src/users/users.routes'),
    {port} = require('./config/config');

const express = require("express"),
    app = express(),
    bodyParser = require("body-parser");


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.use("/auth", userRoutes);

app.listen(port);
console.log("Listening to PORT: " + port);