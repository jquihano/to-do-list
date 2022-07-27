//-----
//DECLARE VARIABLES
//-----
const express = require("express");
const app = express();
const PORT = 1337;
const mongoose = require("mongoose");
const TodoTask = require("./models/TodoTask");
require('dotenv').config()

//Set Middleware
app.set("view engine", "ejs");
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

//Connect to Mongo
mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true }, 
    () => {console.log("Connected to db!");}
)

// GET METHOD
app.get('/', async (request, response) => {
    try {
        response.render('index.ejs')
    } catch (error) {
        response.status(500).send({message: error.message})
    }
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
