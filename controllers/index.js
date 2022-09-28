const router = require('express').Router();
const apiRoutes = require('./api');
const mainRoutes = require('./main-routes.js');

router.use('/', mainRoutes);
router.use('/api', apiRoutes);

module.exports = router;