const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RiverGuideSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    title: {
        type: String,
        required: true
    },
    river: {
        type: String
    },
    region: {
        type: String
    },
    gaugeName: {
        type: String
    },
    grade: [
        {
            from: { type: Number },
            to: { type: Number },
            grade: { type: String }
        }
    ],
    minFlow: {
        type: Number
    },
    maxFlow: {
        type: Number
    },
    putIn: {
        description: {
            type: String
        },
        coords: {
            lat: { type: Number },
            lng: { type: Number }
        }
    },
    takeOut: {
        description: {
            type: String
        },
        coords: {
            lat: { type: Number },
            lng: { type: Number }
        }
    },
    coords: {
        lat: { type: Number },
        lng: { type: Number }
    },
    description: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

module.exports = RiverGuide = mongoose.model("riverGuides", RiverGuideSchema);
