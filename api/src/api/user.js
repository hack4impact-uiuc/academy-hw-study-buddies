const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');

const User = require('../models/user');

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
      return;
    }
  }),
);

router.get(
  '/',
  errorWrap(async (req, res) => {
    const users = await User.find();
    res.status(200).json({
      message: 'Successfully retrieved users',
      success: true,
      result: users,
    });
    return;
  }),
);

router.get(
  '/:userId',

  errorWrap(async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found with id',
      });
    } else {
      res.status(200).json({
        message: 'Successfully retrieved user',
        success: true,
        result: user,
      });
    }
    return;
  }),
);

router.put(
  '/:userId',
  errorWrap(async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
    );
    if (updatedUser) {
      res.status(200).json({
        message: 'Successfully updated user',
        success: true,
        result: updatedUser,
      });
    }
  }),
);

router.delete(
  '/:userId',
  errorWrap(async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
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

module.exports = router;
