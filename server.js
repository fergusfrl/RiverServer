const express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    cors = require("cors"),
    users = require("./routes/users"),
    riverGuides = require("./routes/river-guides"),
    app = express(),
    db = require("./config/keys").mongoURI;

app.use(cors());

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MLab MongoDB
mongoose
    .connect(db)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Passport Middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport.js")(passport);

// Use Routes
app.use("/users", users);
app.use("/guides", riverGuides);

const port = process.env.PORT || 3032;
app.listen(port, () => console.log(`Server running on port ${port}`));
