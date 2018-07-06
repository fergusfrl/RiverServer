const express = require("express"),
    mongoose = require("mongoose"),
    app = express(),
    db = require("./config/keys").mongoURI;

// Connect to MLab MongoDB
mongoose
    .connect(db)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World"));

const port = process.env.PORT || 3031;
app.listen(port, () => console.log(`Server running on port ${port}`));
