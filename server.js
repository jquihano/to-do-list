//-----
//DECLARE VARIABLES
//-----
const express = require('express');
const app = express();
const PORT = 1234;
const mongoose = require('mongoose');
require('dotenv').config()

//-----
//SET MIDDLEWARE
//-----
app.set("view engine", "ejs");
app.use(express.static('publix'));
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.DB_CONNECTION)

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
});