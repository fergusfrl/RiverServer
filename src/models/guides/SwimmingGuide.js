const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SwimmingGuideSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    title: {
        type: String,
        required: true
    },
    river: { type: String },
    region: { type: String },
    gaugeName: { type: String },
    markers: [],
    lat: { type: Number },
    lng: { type: Number },
    description: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

module.exports = SwimmingGuide = mongoose.model(
    "swimmingGuides",
    SwimmingGuideSchema
);
