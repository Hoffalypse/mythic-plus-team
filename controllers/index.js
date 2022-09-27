const router = require('express').Router();

const sequelize = require('../config/connection');

const apiRoutes = require('./api');
console.log("are we here")
const mainRoutes = require('./main-routes.js');

router.use('/', mainRoutes);
router.use('/api', apiRoutes);

module.exports = router;