const express = require("express");
const auctionsRoute = require("./dashboard/auctionRoute");
const usersRoute = require("./dashboard/userRoute");
const adminsRoute = require("./dashboard/adminRoute");
const itemsRoute = require("./dashboard/itemsRoute");

const {protect,logIn} = require("../controllers/Auth");
const {Admin} = require("../db/models");

const router = express.Router();

router.use("/login", logIn(Admin));

router.use(protect(Admin));

router.use("/users", usersRoute);
router.use("/admins", adminsRoute);
router.use("/items", itemsRoute)
router.use("/auctions", auctionsRoute);



module.exports = router;