const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FishingGuideSchema = new Schema({
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
    catch: { type: String },
    activity: { type: String },
    gaugeName: { type: String },
    minFlow: { type: Number },
    maxFlow: { type: Number },
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

module.exports = FishingGuide = mongoose.model(
    "fishingGuides",
    FishingGuideSchema
);
