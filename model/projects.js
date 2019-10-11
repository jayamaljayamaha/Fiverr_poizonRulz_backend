const mongoose= require('mongoose');

const projectsSchema = mongoose.Schema({
    id_user: { type: String, required: true },
    target_fund: { type: Number, required: true },
    user_name: String,
    score_comment_react: Number,
    reacted_users: Array,
    image_url: String,
    current_fund: { type: Number, required: true, default: 0 },
    status: { type: String, required: true }
});

module.exports = mongoose.model('projects', projectsSchema);
