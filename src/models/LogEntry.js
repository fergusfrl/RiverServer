const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LogEntrySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    date: {
        type: Date,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    participantCount: {
        type: Number,
        min: 1
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    description: {
        type: String
    },
    lastUpdated: {
        type: Date,
        default: Date.now()
    }
});

module.exports = User = mongoose.model("logEntry", LogEntrySchema);
