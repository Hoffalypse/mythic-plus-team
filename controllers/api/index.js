const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const characterRoutes = require('./character-routes.js');

router.use('/users', userRoutes);
router.use('/characters', characterRoutes);



module.exports = router;