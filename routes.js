const express = require('express');

const dashboardRoute = require('./routes/dashboardRoute');
const websiteRoute = require('./routes/websiteRoute');
const {_500, _404} = require('./MiddleWares/errorsMW');

const router = express.Router();

router.use('/dashboard', dashboardRoute);
router.use('/', websiteRoute);

// Error Handlers
router.use(_404); // Not Found Handlers
router.use(_500); // Error Handler

module.exports = router;