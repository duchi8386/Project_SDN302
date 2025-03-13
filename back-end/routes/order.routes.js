const express = require("express");
const { getOrderList, createOrderWithoutVNPay, cancelOrder} = require("../controller/order.controller");
const {authMiddleware} = require("../middleware/auth.middleware"); // Middleware xác thực

const router = express.Router();

router.get("/", authMiddleware, getOrderList);
router.post("/cod", authMiddleware, createOrderWithoutVNPay);
router.put("/:orderId/cancel", authMiddleware, cancelOrder);

module.exports = router;
