const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const Session = require('../models/session');

router.post(
  '/',
  errorWrap(async (req, res) => {
    const newSession = await Session.create(req.body);
    if (newSession) {
      res.status(200).json({
        message: 'Successfully created new session',
        success: true,
        result: newSession,
      });
    }
  }),
);

router.get(
  '/',
  errorWrap(async (req, res) => {
    const sessions = await Session.find({});
    res.status(200).json({
      message: `Successfully retrieved all sessions.`,
      success: true,
      result: sessions,
    });
    return;
  }),
);

// Get all displayed sessions on the home page
router.get(
  '/displayed',
  errorWrap(async (req, res) => {
    let activeSessions = await Session.find({ active: 'true' });
    const maxDisplayed = 40;
    // If there are >= maximum displayed active sessions, all will be displayed
    if (activeSessions.length >= maxDisplayed) {
      res.status(200).json({
        message: `Successfully retrieved all displayed sessions on the home page.`,
        success: true,
        result: activeSessions,
      });
      return;
    }

    const inactiveSessions = await Session.find({ active: 'false' }).sort({
      startTime: 'asc',
    });

    // If the sum of active and inactive sessions is less than the maximum displayed sessions, all sessions (inactive and active) will be displayed
    if (activeSessions.length + inactiveSessions.length < maxDisplayed) {
      let allSessions = activeSessions.concat(inactiveSessions);
      res.status(200).json({
        message: `Successfully retrieved all displayed sessions on the home page.`,
        success: true,
        result: allSessions,
      });
      return;
    }

    // Else, if there are <maximum displayed active sessions,
    // Inactive sessions will populate until there are maximum displayed sessions on the home page in ascending start time order
    let allSessions = activeSessions.concat(
      inactiveSessions.slice(0, maxDisplayed - activeSessions.length),
    );
    res.status(200).json({
      message: `Successfully retrieved all displayed sessions on the home page.`,
      success: true,
      result: allSessions,
    });
    return;
  }),
);

router.get(
  '/:sessionId',
  errorWrap(async (req, res) => {
    const session = await Session.findById(req.params.sessionId);
    if (!session) {
      res.status(404).json({
        success: false,
        message: 'Session not found with id',
      });
    } else {
      res.status(200).json({
        success: true,
        result: session,
        message: 'Successfully retrieved session',
      });
    }
  }),
);

router.get(
  '/attending/:userId',
  errorWrap(async (req, res) => {
    const attendingSessions = await Session.find({
      attendees: req.params.userId,
    }).sort({ startTime: 1 });
    if (!attendingSessions) {
      res.status(404).json({
        success: false,
        message: 'Could not retrieve sessions attended by user',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Successfully retrieved sessions attended by user',
      result: attendingSessions,
    });
    return;
  }),
);

router.put(
  '/:sessionId',
  errorWrap(async (req, res) => {
    const updatedSession = await Session.findByIdAndUpdate(
      req.params.sessionId,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedSession) {
      res.status(404).json({
        success: false,
        message: 'Session not found with id',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Successfully updated session',
      result: updatedSession,
    });
  }),
);

router.delete(
  '/:sessionId',
  errorWrap(async (req, res) => {
    const deletedSession = await Session.findByIdAndDelete(
      req.params.sessionId,
    );

    if (!deletedSession) {
      res.status(404).json({
        success: false,
        message: 'Session not found with id',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Session successfully deleted',
      result: deletedSession,
    });
  }),
);

module.exports = router;
