const express = require("express");
const { signup, signin } = require("../controllers/auth");
const {
  validateSignupRequests,
  validateSigninRequests,
  isRequestValidated,
} = require("../validators/auth");
const router = express.Router();

router.post("/signup", validateSignupRequests, isRequestValidated, signup);
router.post("/signin", validateSigninRequests, isRequestValidated, signin);

// router.post("/profile", requireSignin, (req, res) => {
//   res.status(200).json({
//     message: "userprofile",
//   });
// });
module.exports = router;
