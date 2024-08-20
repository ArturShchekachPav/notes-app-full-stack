const router = require('express').Router();
const userRoutes = require('./user');
const listRoutes = require('./list');
const noteRoutes = require('./note');
const colorRoutes = require('./color');
const {createUser, login} = require("../contollers/users");

router.post('/signup', createUser);
router.post('/signin', login);

router.use('/colors', colorRoutes);
router.use('/users', userRoutes);
router.use('/lists', listRoutes);
router.use('/notes', noteRoutes);

router.use('*', (req, res, next) => next());

module.exports = router;