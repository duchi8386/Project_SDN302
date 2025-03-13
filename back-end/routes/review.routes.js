const express = require("express");
const {createReview, getReviewsByProductId} = require("../controller/review.controller");
const {authMiddleware, userAuthorities} = require("../middleware/auth.middleware");

const router = express.Router();

router.get('/product/:productId', getReviewsByProductId);
router.post("/", authMiddleware, userAuthorities ,createReview);

module.exports = router;