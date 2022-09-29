const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const characterRoutes = require('./character-routes.js');
const teammateRoutes = require('./teammate-routes.js');

router.use('/users', userRoutes);
router.use('/characters', characterRoutes);
router.use('/teammates', teammateRoutes);



module.exports = router;