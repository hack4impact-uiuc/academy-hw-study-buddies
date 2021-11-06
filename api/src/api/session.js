const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
import { ObjectId } from 'mongodb';

// uncomment to use the schema
const Session = require('../models/session');
const isValidMongoId = (id) => ObjectId.isValid(id);

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
      message: `Successfully retrieved all resources.`,
      success: true,
      result: sessions,
    });
    return;
  }),
);

router.get(
  '/:sessionId',

  errorWrap(async (req, res) => {
    if (!isValidMongoId(req.params.sessionId)) {
      res.status(400).json({
        success: false,
        message: 'Bad ID format',
      });
      return;
    }

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

router.put(
  '/:sessionId',
  errorWrap(async (req, res) => {
    if (!isValidMongoId(req.params.sessionId)) {
      res.status(400).json({
        success: false,
        message: 'Bad ID format',
      });
      return;
    }

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
    if (!isValidMongoId(req.params.sessionId)) {
      res.status(400).json({
        success: false,
        message: 'Bad ID format',
      });
      return;
    }

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
