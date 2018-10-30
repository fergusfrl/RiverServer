const express = require("express");
const router = express.Router();
const passport = require("passport");

const Guide = require("../../models/guides/FishingGuide");

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
        const data = req.body;

        const newGuide = new Guide({
            author: req.user.id,
            title: data.title,
            river: data.river,
            region: data.region,
            catch: data.catch,
            activity: data.activity,
            minFlow: data.minFlow,
            maxFlow: data.maxFlow,
            gaugeName: data.gaugeName,
            lat: data.lat,
            lng: data.lng,
            description: data.description,
            markers: data.markers
        });

        newGuide.save().then(guide => res.json(guide));
    }
);

// @route   PUT guides/:id
// @desc    Update guide by id
// @access  Private
router.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const data = req.body;

        const updateObject = {
            ...(data.title && { title: data.title }),
            ...(data.river && { river: data.river }),
            ...(data.region && { region: data.region }),
            ...(data.activity && { activity: data.activity }),
            ...(data.catch && { catch: data.catch }),
            ...(data.gaugeName && { gaugeName: data.gaugeName }),
            ...(data.grade && { grade: data.grade }),
            ...(data.minFlow && { minFlow: data.minFlow }),
            ...(data.maxFlow && { maxFlow: data.maxFlow }),
            ...(data.lat && { lat: data.lat }),
            ...(data.lng && { lng: data.lng }),
            ...(data.description && { description: data.description })
        };

        Guide.findByIdAndUpdate(
            req.params.id.toString(),
            { $set: updateObject },
            { upsert: true, new: true }
        )
            .then(guide => res.json(guide))
            .catch(err => console.log(err));
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
