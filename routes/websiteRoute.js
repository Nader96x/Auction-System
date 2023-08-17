const express = require('express');
const auctionRoute = require('./website/auctionRoute');

const {protect, logIn} = require("../controllers/Auth");
const {User} = require("../db/models");

const router = express.Router();

router.use("/login", logIn(User));
router.use('/auctions', auctionRoute);

// router.use(protect(User));


module.exports = router;