const express = require("express");
const {getUserById} = require("../controller/user.controller");

const router = express.Router();

router.get("/:id", getUserById);

module.exports = router;