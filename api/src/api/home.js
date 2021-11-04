const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const { createResponse } = require('../utils');

// uncomment to use the schema
const Home = require('../models/home');

router.get(
  '/',
  errorWrap(async (req, res) => {
    const home = await Home.findOne();

    // Template for formulating a successful API response
    if (home) {
      const statusCode = 200;
      const responseBody = createResponse(
        statusCode,
        'Successfully returned home text',
        home.text,
      );
      res.status(statusCode).json(responseBody);
    }
  }),
);

router.post(
  '/',
  errorWrap(async (req, res) => {
    let { text } = req.body;
    if (text && text !== null) {
      const newHomeText = new Home({
        text,
      });
      await newHomeText.save();
      const statusCode = 200;
      const responseBody = createResponse(
        statusCode,
        'Successfully created new Home object',
        newHomeText,
      );
      res.status(statusCode).json(responseBody);
    }
  }),
);

router.get(
  '/id/:id',
  errorWrap(async (req, res) => {
    const homeText = await Home.findOne({ _id: req.params.id });
    const statusCode = 200;
    const responseBody = createResponse(
      statusCode,
      'Successfully returned home text',
      homeText,
    );
    res.status(statusCode).json(responseBody);
  }),
);

module.exports = router;
