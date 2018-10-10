const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/LogEntry');
// Load User Model
const User = require('../../models/User');

// @route   GET logbook/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(logEntry => {
        if (!logEntry) {
          errors.noprofile = 'There are no log entries for this user';
          return res.status(404).json(errors);
        }
        res.json(logEntry);
      })
      .catch(err => res.status(404).json(err));
  }
);
