const { check, validationResult } = require("express-validator");

exports.validateSignupRequests = [
  check("firstName").notEmpty().withMessage("first name is requiered"),
  check("lastName").notEmpty().withMessage("last name is requiered"),
  check("email").notEmpty().withMessage("valid email is requiered"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be atleast 6 character long"),
];

exports.validateSigninRequests = [
  check("email").notEmpty().withMessage("valid email is requiered"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be atleast 6 character long"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
