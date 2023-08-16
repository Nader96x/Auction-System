const express = require("express");
const auctionRoute = require("./dashboard/auctionRoute");
const userRoute = require("./dashboard/userRoute");
const adminRoute = require("./dashboard/adminRoute");

const router = express.Router();

router.use("/auctions", auctionRoute);
router.use("/users", userRoute);
router.use("/admins", adminRoute);

module.exports = router;