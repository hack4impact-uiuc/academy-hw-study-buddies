const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const { createResponse } = require('../utils');

// uncomment to use the schema
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
})
  );

router.get(
    '/',
    errorWrap(async (req, res) => {
      const session = await Session.findOne();
  
      // Template for formulating a successful API response
      if (session) {
        const statusCode = 200;
        const responseBody = createResponse(
          statusCode,
          'Successfully returned session text',
          session.text,
        );
        res.status(statusCode).json(responseBody);
      }
    }),
  );

module.exports = router;
