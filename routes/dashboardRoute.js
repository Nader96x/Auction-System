const express = require("express");
const auctionsRoute = require("./dashboard/auctionRoute");
const usersRoute = require("./dashboard/userRoute");
const adminsRoute = require("./dashboard/adminRoute");
const itemsRoute = require("./dashboard/itemsRoute");

const {protect, logIn, resetPassword, confirmResetPassword} = require("../controllers/Auth");
const {Admin} = require("../db/models");

const router = express.Router();

router.post("/login", logIn(Admin));
router.post("/resetPassword", resetPassword(Admin));
router.post("/confirmResetPassword", confirmResetPassword(Admin));


// router.use(protect(Admin));

router.use("/users", usersRoute);
router.use("/admins", adminsRoute);
router.use("/items", itemsRoute)
router.use("/auctions", auctionsRoute);


module.exports = router;