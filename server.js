//-----
//DECLARE VARIABLES
//-----
const express = require("express");
const app = express();
const PORT = process.env.PORT || 1337;
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
        TodoTask.find({}, (err, tasks) => {
            response.render('index.ejs', {todoTasks : tasks})
        })
        
    } catch (error) {
        response.status(500).send({message: error.message})
    }
})

//POST ROUTE
app.post('/', async (req, res) => {
    const todoTask = new TodoTask(
        {
            title: req.body.title,
            content: req.body.content
        });
    try {
        await todoTask.save();
        console.log(todoTask)
        res.redirect("/");
    } catch (err) {
        if (err) return res.status(500).send(err);
        res.redirect("/");
    }
});

//EDIT or UPDATE METHOD
app.post('/', async (req, res) => {
    const todoTask = new TodoTask(
        {
            title: req.body.title,
            content: req.body.content
        });
    try {
        await todoTask.save();
        console.log(todoTask)
        res.redirect("/");
    } catch (err) {
        if (err) return res.status(500).send(err);
        res.redirect("/");
    }
});

//UPDATE METHOD
app
    .route("/edit/:id")
    .get((req, res) => {
        const id = req.params.id;
        TodoTask.find({}, (err, tasks) => {
            res.render("edit.ejs", { todoTasks: tasks, idTask: id });
        });
    })
    .post((req, res) => {
        const id = req.params.id;
        TodoTask.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                content: req.body.content
            },

            err => {
                if (err) return res.status(500).send(err);
                res.redirect("/");
            });
    });

//DELETE
app
    .route('/remove/:id')
    .get((req, res) => {
        const id = req.params.id
        TodoTask.findByIdAndRemove(id, err => {
            if (err) return res.status(500).send(err);
                res.redirect("/");
        })
    })

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
