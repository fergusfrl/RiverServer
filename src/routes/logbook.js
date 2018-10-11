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
// @desc    Create log entry
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


// @route   PUT logbook/:id
// @desc    Update log entry
// @access   Private
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { date, section, participantCount, rating, description } = req.body;
    const updateLog = {
      ...(date && { date: date }),
      ...(section && { section: section }),
      ...(participantCount && { participantCount: participantCount }),
      ...(rating && { rating: rating }),
      ...(description && { description: description })
    };
    
    LogEntry.findOneAndUpdate(
      { user: req.user.id, _id: req.params.id },
      { $set: updateLog },
      { upsert: true, new: true }
    )
     .then(logEntry => res.json(logEntry))
     .catch(err => console.log(err));
  }
);


// @route   DELETE logbook/:id
// @desc    Deletes a log entry
// @access  Private
router.delete(
  './:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    LogEntry.findOneAndRemove({ user: req.user.id, _id: req.params.id })
      .then(() => {
        LogEntry.remove().then(() => {
          res.json({ success: true });
        })
      })
      .catch(err => console.log(err));
  }
)

