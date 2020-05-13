const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

//@route POST api
//@desc Register a user
//@access Public

router.post(
  "/register",
  [
    //validating using express-validator that fields are not empty
    check("name", "Please enter name!").not().isEmpty(),
    check("card", "Please enter card!").not().isEmpty(),
    check("account", "Please enter account!").not().isEmpty(),
    check("balance", "Please enter balance!").not().isEmpty(),
    check("pin", "Please enter pin!").not().isEmpty(),
  ],
  async (req, res) => {
    //collecting all the errors occurred in validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //if there are errors
      return res.status(400).json({ errors: errors.array() });
    }

    //else destructuring the request body content
    const { name, card, account, balance, pin } = req.body;

    try {
      let user = new User({
        name,
        card,
        account,
        balance,
        pin,
      });

      //saving user to database
      await user.save();
      return res.status(200).json({
        status: "success",
      });
    } catch (err) {
      return res.status(500).json({
        status: "error",
      });
    }
  }
);

//@route POST api
//@desc Authenticate(Login) User
//@access Public
router.post(
  "/login",
  [
    //validating using express-validator that fields are not empty
    check("card", "Please enter card!").not().isEmpty(),
    check("pin", "Please enter pin!").not().isEmpty(),
  ],
  async (req, res) => {
    //collecting all the errors occurred in validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //if there are errors
      return res.status(400).json({ errors: errors.array() });
    }

    // else destructuring the request body content
    const { card, pin } = req.body;

    try {
      let user = await User.findOne({ card });

      //if user with given card isn't found
      if (!user) {
        return res.json({ status: "error" });
      }
      //comparing the entered pin and pin in database
      const isMatch = user.pin === pin ? true : false;

      if (!isMatch) {
        return res.json({ status: "error" });
      } else {
        return res.status(200).json({ status: "success" });
      }
    } catch (err) {
      return res.status(500).json({ status: "error" });
    }
  }
);
module.exports = router;
