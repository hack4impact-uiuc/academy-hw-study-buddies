const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const { createResponse } = require('../utils');

const Home = require('../models/home');

router.post(
  '/',
  errorWrap(async (req, res) => {
    const newUser = await User.create(req.body);
    if (newUser) {
      req.status(200).json({
        message: 'successfully created new user',
        success: true,
        result: newUser,
      });
      return;
    }
  }),
);

router.get(
  '/',
  errorWrap(async (req, res) => {
    const users = await User.find();
    req.status(200).json({
      message: 'successfully retrieved users',
      success: true,
      result: users,
    });
    return;
  }),
);

router.get(
  '/:Id',

  errorWrap(async (req, res) => {
    const users = await User.findById(req.params.Id);
    req.status(200).json({
      message: 'successfully retrieved users',
      success: true,
      result: users,
    });
    return;
  }),
);

router.post(
  '/',
  errorWrap(async (req, res) => {
    const newUser = await User.create(req.body);
    if (newUser) {
      res.status(200).json({
        message: 'Successfully created new user',
        success: true,
        result: newUser,
      });
    }
  }),
);

router.delete(
  '/:Id',
  requireAdmin,
  errorWrap(async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.Id);

    res.status(200).json({
      success: true,
      message: 'User successfully deleted',
      result: deletedUser,
    });
  }),
);

/*
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

*/
