const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    CREATED_CODE, authSuccessMessage, dublicateEmailErrorMessage, incorrectRequestErrorMessage,
    userNotFoundMessage, registerErrorMessage, updateUserErrorMessage,
    authDataErrorMessage
} = require('../utils/constants');
const ConflictError = require('../errors/conflict-error');
const IncorrectRequestError = require('../errors/incorrect-request-error');
const NotFoundError = require('../errors/not-found-error');
const AuthError = require('../errors/auth-error');
const { dbConnection } = require('../utils/config');
  

const getUsers = (req, res, next) => {
  return dbConnection.query('SELECT * FROM users WHERE owner = ?', [req.user.id])
    .then(users => res.send(users[0]))
    .catch(next);
};

const getUserById = (req, res, next) => {
  const id = req.user;

  return dbConnection.query('SELECT * FROM users WHERE id = ?', [id])
    .then((user) => {
      if (!user[0]) {
        throw new NotFoundError(userNotFoundMessage);
      }

      return res.send(user[0]);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectRequestError(incorrectRequestErrorMessage));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
const {email, name, password} = req.body;

    bcrypt.hash(password, 10)
    .then((hash) => dbConnection.query('INSERT INTO users (email, name, password)', [email, name, hash]))
    .then((newUser) => dbConnection.query('SELECT * FROM users WHERE id = ?', [newUser[0].id])
      .then((user) => res.status(CREATED_CODE).send(user[0])))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(dublicateEmailErrorMessage));
      } else if (err.name === 'ValidationError') {
        next(new IncorrectRequestError(incorrectRequestErrorMessage));
      } else {
        next(new AuthError(registerErrorMessage));
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return dbConnection.query('SELECT * users WHERE email = ?', [email])
    .then(user => {
      if(!user[0]) {
        throw new AuthError(authDataErrorMessage);
      }

      return bcrypt.compare(password, user.password).then(matched => {
        if(!matched) {
          throw new AuthError(authDataErrorMessage);
        }

        return user;
      });
    })
    .then((user) => {
      const token = jwt.sign(
        { id: user.id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      }).send({ message: authSuccessMessage });
    })
    .catch(next);
};

const updateUserData = (req, res, next) => {
  const { name, email } = req.body;
  const { id } = req.user;

  return dbConnection.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id])
    .then((user) => {
      if (!user[0]) {
        throw new NotFoundError(userNotFoundMessage);
      }

      return res.send(user[0]);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(dublicateEmailErrorMessage));
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new IncorrectRequestError(updateUserErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports = { getUsers, getUserById, createUser, login, updateUserData };