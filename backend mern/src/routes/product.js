const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const {
  createProduct,
  getProductsBySlug,
  getProductDetailsById,
} = require("../controllers/product");
const router = express.Router();

const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post(
  "/product/create",
  requireSignin,
  adminMiddleware,
  upload.array("productPictures"),
  createProduct
);
router.get("/products/:slug", getProductsBySlug);

router.get("/product/:productId", getProductDetailsById);

// router.get("/category/getcategory", getCategories);

module.exports = router;
