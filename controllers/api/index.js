
const router = require('express').Router();
const userRoutes = require('./user-routes.js');
console.log(" we here")

router.use('/users', userRoutes);



module.exports = router;