const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WhitewaterGuideSchema = new Schema({
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
    grade: { type: String },
    minFlow: { type: Number },
    maxFlow: { type: Number },
    markers: [],
    flowSpecificGrades: [],
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

module.exports = WhitewaterGuide = mongoose.model(
    "whitewaterGuides",
    WhitewaterGuideSchema
);
