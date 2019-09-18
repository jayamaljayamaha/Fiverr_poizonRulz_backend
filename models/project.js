const mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    id: Number,
    projectName: String,
    likes: Number,
    projectImage: String
});

module.exports = mongoose.model('project', projectSchema);