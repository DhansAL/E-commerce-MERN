const express = require("express");
const { signup, signin, signout } = require("../../controllers/admin/auth");
const { requireSignin } = require("../../common-middleware");

const {
  validateSignupRequests,
  validateSigninRequests,
  isRequestValidated,
} = require("../../validators/auth");
const router = express.Router();

router.post(
  "/admin/signup",
  validateSignupRequests,
  isRequestValidated,
  signup
);
router.post(
  "/admin/signin",
  validateSigninRequests,
  isRequestValidated,
  signin
);
router.post("/admin/signout", requireSignin, signout);

module.exports = router;
