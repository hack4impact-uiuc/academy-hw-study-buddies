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
      message: 'Successfully retrieved all users',
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
    if (!updatedUser) {
      res.status(404).json({
        message: 'User not found, update unsuccessful',
        success: false,
      });
    }
  }),
);

router.delete(
  '/:userId',
  errorWrap(async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (deletedUser) {
      res.status(200).json({
        success: true,
        message: 'User successfully deleted',
        result: deletedUser,
      });
    }
    if (!deletedUser) {
      res.status(404).json({
        success: false,
        message: 'User not found, deletion unsuccessful',
      });
    }
  }),
);

module.exports = router;
