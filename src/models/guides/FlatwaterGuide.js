const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FlatwaterGuideSchema = new Schema({
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
    activity: {
        type: String,
        required: true
    },
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

module.exports = FlatwaterGuide = mongoose.model(
    "flatwaterGuides",
    FlatwaterGuideSchema
);
