const express = require("express"),
    router = express.Router(),
    gravatar = require("gravatar"),
    bcrypt = require("bcryptjs"),
    jwt = require("jsonwebtoken"),
    keys = require("../config/keys"),
    passport = require("passport");

// Load input validation
const validateRegisterInput = require("../validation/register"),
    validateLoginInput = require("../validation/login");
validateChangePasswordInput = require("../validation/change-password");

// Load User model
const User = require("../models/User");

// @route   GET users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   POST users/register
// @desc    Register User
// @access  Public
router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            errors.email = "Email already exists";
            return res.status(400).json(errors);
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: "200", // Size
                r: "pg", // Rating
                d: "mm" // Default
            });

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password,
                defaultActivity: req.body.defaultActivity
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route   POST users/login
// @desc    Login User / Returning JWT
// @access  Public
router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email,
        password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {
        // Check for user
        if (!user) {
            errors.email = "User not found";
            return res.status(404).json(errors);
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User Matched
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    creationDate: user.date,
                    favourites: user.favourites,
                    defaultActivity: user.defaultActivity
                };

                // Sign Token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                errors.password = "Password incorrect";
                return res.status(400).json(errors);
            }
        });
    });
});

// @route   PUT users/login
// @desc    Changes user password
// @access  private
router.put(
    "/login",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { errors, isValid } = validateChangePasswordInput(req.body);

        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const email = req.body.email,
            password = req.body.password;

        let newPassword = req.body.newPassword;

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newPassword, salt, (err, hash) => {
                if (err) throw err;
                newPassword = hash;

                // Find user by email
                User.findOneAndUpdate(
                    { email },
                    { $set: { password: newPassword } }
                ).then(user => {
                    // Check for user
                    if (!user) {
                        errors.email = "User not found";
                        return res.status(404).json(errors);
                    }

                    // Check password
                    bcrypt.compare(password, user.password).then(isMatch => {
                        if (isMatch) {
                            res.json({ success: true });
                        } else {
                            errors.password = "Password incorrect";
                            return res.status(400).json(errors);
                        }
                    });
                });
            });
        });
    }
);

// @route   PUT users/current/add-favourite/:id
// @desc    Add a favourite
// @access  Private
router.put(
    "/current/add-favourite/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        User.findOneAndUpdate(
            { email: req.body.email },
            {
                $push: { favourites: req.params.id }
            }
        )
            .then(() => res.json({ success: true }))
            .catch(err => console.log(err));
    }
);

// @route   DELETE users/current/remove-favourites/:id
// @desc    Remove a favourite
// @access  Private
router.delete(
    "/current/delete-favourite/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        User.findOneAndUpdate(
            { email: req.body.email },
            {
                $pull: { favourites: req.params.id }
            }
        )
            .then(() => res.json({ success: true }))
            .catch(err => console.log(err));
    }
);

// @route   GET users/current
// @desc    Return current user
// @access  Private
router.get(
    "/current",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        });
    }
);

module.exports = router;
