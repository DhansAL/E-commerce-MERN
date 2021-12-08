const User = require("../models/user");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");
const bcrypt = require("bcrypt");

const { validationResult } = require("express-validator");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    //if user is already registered
    if (user) {
      return res.status(400).json({
        message: "user already registered",
      });
    }
    //else we will make an account for user
    const { firstName, lastName, email, password } = req.body;

    const hash_password = await bcrypt.hash(password, 10);

    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      // userName: Math.random.toString(),
      userName: shortid.generate(),
    });

    _user.save((error, data) => {
      if (error) {
        console.log(error);
        return res.status(400).json({ message: "something went wrong" });
      }
      if (data) {
        return res.status(200).json({
          message: "user signed up successfully",
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec(async (error, user) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (user) {
      const isPassword = await user.authenticate(req.body.password);

      if (isPassword && user.role === "user") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        res.status(400).json({
          message: "invalid  credentials",
        });
      }
    }
  });
};
