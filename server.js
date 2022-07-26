//-----
//DECLARE VARIABLES
//-----
const express = require('express');
const app = express();
const PORT = 1234;
const mongoose = require('mongoose');

require('dotenv').config()
const ToDoTask = require('./models/todotask')


//-----
//SET MIDDLEWARE
//-----
app.set("view engine", "ejs");
app.use(express.static('publix'));
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.DB_CONNECTION, 
    {useNewUrlParser: true},
    () => {console.log(`Connected to the db!`)}
);

app.get('/', async (req, res) => {
    try {
        ToDoTask.find({}, (err, tasks) => {
            res.render('index.ejs', {todoTasks: tasks})
        })
    } catch (error) {
        if(err) return res.status(500).send(err)
    }
})


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
});