const router = require('express').Router();
const userRoutes = require('./user');
const listRoutes = require('./list');
const noteRoutes = require('./note');
const colorRoutes = require('./color');
const {createUser, login} = require("../contollers/users");
const { createUserValidation, loginValidation } = require('../utils/validation');
const NotFoundError = require('../errors/not-found-error');
const auth = require('../middlewares/auth');

router.post('/signup', createUserValidation, createUser);
router.post('/signin', loginValidation, login);
router.get('/signout', auth, (req, res) => {
    res.clearCookie('jwt').send({ message: 'Выход' });
  });

router.use('/colors', colorRoutes);
router.use('/users', userRoutes);
router.use('/lists', listRoutes);
router.use('/notes', noteRoutes);

router.use('*', (req, res, next) => next(new NotFoundError('Некорректный путь запроса')));

module.exports = router;