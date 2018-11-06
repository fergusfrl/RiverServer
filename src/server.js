const express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    cors = require("cors"),
    users = require("./routes/users"),
    guides = require("./routes/guides"),
    whitewater = require("./routes/categories/whitewater"),
    flatwater = require("./routes/categories/flatwater"),
    swimming = require("./routes/categories/swimming"),
    motorised = require("./routes/categories/motorised"),
    fishing = require("./routes/categories/fishing"),
    logbook = require("./routes/logbook"),
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
app.use("/guides", guides);
app.use("/logbook", logbook);

// Guide routes
app.use("/whitewater", whitewater);
app.use("/flatwater", flatwater);
app.use("/fishing", fishing);
app.use("/swimming", swimming);
app.use("/motorised", motorised);

const port = process.env.PORT || 3031;
app.listen(port, () => console.log(`Server running on port ${port}`));
