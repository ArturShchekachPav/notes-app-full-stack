const router = require('express').Router();
const userRoutes = require('./user');
const listRoutes = requere('./list');
const noteRoutes = require('./note');
const colorRoutes = require('./color');

router.use('/colors', colorRoutes);
router.use('/users', userRoutes);
router.use('/lists', listRoutes);
router.use('/notes', noteRoutes);

module.exports = router;