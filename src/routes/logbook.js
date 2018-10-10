const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const LogEntry = require('../../models/LogEntry');
// Load User Model
const User = require('../../models/User');


// @route   GET logbook/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));


// @route   GET logbook/
// @sesc    Retrieve list of log entries
// @access  Private
router.get(
  './',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    LogEntry.find({ user: req.user.id })
      .sort({ date: -1 })
      .then(logEntries => res.json(logEntries))
      .catch(err => res.status(404).json({ nopostsfound: 'No logs found' }));
  }
)


// @route   POST logbook/
// @desc    Create post
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newLogEntry = new LogEntry({
      user: req.user.id,
      date: req.body.date,
      section: req.body.section,
      participantCount: req.body.participantCount,
      rating: req.body.rating,
      description: req.body.description
    });

    newLogEntry.save().then(logEntry => res.json(logEntry));
  }
);


// Add @PUT route - allow user to edit own entries


// Add @DELETE route - allow users to delete own entries

