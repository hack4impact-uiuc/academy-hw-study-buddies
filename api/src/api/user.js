const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const { getMemberInfo } = require('../utils/apiWrapper');

const User = require('../models/user');

/*
  Extracts memberDbId from user cookie
*/
const getUserId = (req) => {
  if (req.session && req.session.passport && req.session.passport.user) {
    return req.session.passport.user;
  }
  return false;
};

/*
  Uses browser cookie to log in user
  Registers new user in DB if user not found
*/
router.get(
  '/',
  errorWrap(async (req, res) => {
    const memberDbId = getUserId(req);
    let user = await User.findOne({ memberDbId: memberDbId });
    if (!user) {
      user = await User.create({
        memberDbId,
        classes: [],
      });
    }
    const memberInfoResult = await getMemberInfo(memberDbId);
    const memberInfo = memberInfoResult.data.result;
    console.log('memberInfo:', memberInfo);
    let expandedUser = {
      firstName: memberInfo.firstName,
      lastName: memberInfo.lastName,
      memberDbId: user._doc.memberDbId,
      classes: user._doc.classes,
    };
    if (!user.firstName || !user.lastName) {
      const updatedUser = await User.findByIdAndUpdate(
        user._doc._id,
        expandedUser,
      );
      if (!updatedUser) {
        res.status(404).json({
          message: 'User not found, update unsuccessful',
          success: false,
        });
        return;
      }
    }
    expandedUser = { _id: user._doc._id, ...expandedUser };
    res.status(200).json({
      message: 'Successfully retrieved user',
      success: true,
      result: expandedUser,
    });
    return;
  }),
);

router.get(
  '/all',
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

// all user classes
router.get(
  '/classes', //changed
  errorWrap(async (req, res) => {
    const users = await User.find({}).select({
      firstName: 1,
      lastName: 1,
      classes: 1,
    });
    res.status(200).json({
      message: 'Successfully retrieved all user classes',
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
      return;
    }
    res.status(200).json({
      message: 'Successfully retrieved user',
      success: true,
      result: user,
    });
    return;
  }),
);

router.put(
  '/:userId',
  errorWrap(async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      res.status(404).json({
        message: 'User not found, update unsuccessful',
        success: false,
      });
      return;
    }
    res.status(200).json({
      message: 'Successfully updated user',
      success: true,
      result: updatedUser,
    });
    return;
  }),
);

router.delete(
  '/:userId',
  errorWrap(async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      res.status(404).json({
        success: false,
        message: 'User not found, deletion unsuccessful',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'User successfully deleted',
      result: deletedUser,
    });
    return;
  }),
);

module.exports = router;
