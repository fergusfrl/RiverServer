const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now()
    },
    favourites: {
        type: [String],
        required: false
    },
    defaultActivity: {
        type: String,
        required: false
    }
});

module.exports = User = mongoose.model("users", UserSchema);
