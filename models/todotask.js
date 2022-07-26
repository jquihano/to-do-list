const mongoose = require('mongoose');

const todoTaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
})