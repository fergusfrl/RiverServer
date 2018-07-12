const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Guide = require("../models/RiverGuide");

// Validation
const validatePostInput = require("../validation/river-guide");

// @route   GET guides/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Guide Works" }));

// @route   GET guides/
// @desc    Get all guides
// @access  Public
router.get("/", (req, res) => {
    Guide.find()
        .sort({ dateCreated: -1 })
        .then(guides => res.json(guides))
        .catch(err =>
            res.status(404).json({ noguidesfound: "No guides found" })
        );
});

// @route   GET guides/:id
// @desc    Get guide by id
// @access  Public
router.get("/:id", (req, res) => {
    Guide.findById(req.params.id)
        .then(guide => res.json(guide))
        .catch(err =>
            res.status(404).json({
                noguidefound: `No guide found with id: ${req.params.id}`
            })
        );
});

// @route   POST guides
// @desc    Create guide
// @access  Private
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        // Validation
        const { errors, isValid } = validatePostInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const data = req.body;
        const newGuide = new Guide({
            author: req.user.id,
            title: data.title,
            river: data.river,
            region: data.region,
            grade: data.grade,
            gaugeName: data.gaugeName,
            minFlow: data.minFlow,
            maxFlow: data.maxFlow,
            putIn: data.putIn,
            takeOut: data.takeOut,
            coords: {
                lat: data.lat,
                lng: data.lng
            },
            description: data.description
        });

        newGuide.save().then(guide => res.json(guide));
    }
);

// @route   PUT guide/:id
// @desc    Update guide by id
// @access  Private
router.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        // Validation
        const { errors, isValid } = validatePostInput(req.body);
        if (!isValid) {
            return res.status(401).json(errors);
        }

        const data = req.body;
        const updateObject = {
            ...(data.title && { title: data.title }),
            ...(data.river && { river: data.river }),
            ...(data.region && { region: data.region }),
            ...(data.gaugeName && { gaugeName: data.gaugeName }),
            ...(data.grade && { grade: data.grade }),
            ...(data.minFlow && { minFlow: data.minFlow }),
            ...(data.maxFlow && { maxFlow: data.maxFlow }),
            ...(data.putIn && { putIn: data.putIn }),
            ...(data.takeOut && { takeOut: data.takeOut }),
            ...(data.coords.lat && { coords: { lat: data.coords.lat } }),
            ...(data.coords.lng && { coords: { lng: data.coords.lng } }),
            ...(data.description && { description: data.description })
        };

        Guide.findByIdAndUpdate(req.params.id, { $set: updateObject });
    }
);

// @route   DELETE guide/:id
// @desc    Delete guide by id
// @access  Private
router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Guide.findByIdAndRemove(req.params.id)
            .then(guide => {
                // Check for guide owner
                if (guide.author.toString() !== req.user.id) {
                    return res.status(401).json({
                        notauthorized: "User not authorized to delete"
                    });
                }

                // Delete
                //Guide.remove().then(() =>
                res.json({ success: true });
            })
            .catch(err =>
                res.status(404).json({ guidenotfound: "Guide not found" })
            );
    }
);

module.exports = router;
