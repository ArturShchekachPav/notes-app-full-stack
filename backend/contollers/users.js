const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  CREATED_CODE, authSuccessMessage, dublicateEmailErrorMessage, incorrectRequestErrorMessage,
  userNotFoundMessage, registerErrorMessage, updateUserErrorMessage,
  authDataErrorMessage,
} = require('../utils/constants');
const ConflictError = require('../errors/conflict-error');
const IncorrectRequestError = require('../errors/incorrect-request-error');
const NotFoundError = require('../errors/not-found-error');
const AuthError = require('../errors/auth-error');
const { dbConnection } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => dbConnection.query('SELECT name, email FROM users', [req.user.id])
  .then((users) => res.send(users[0]))
  .catch(next);

const getProfileData = (req, res, next) => {
  const { id } = req.user;

  return dbConnection.query('SELECT name, email FROM users WHERE user_id = ?', [id])
    .then((user) => {
      if (!user[0][0]) {
        throw new NotFoundError(userNotFoundMessage);
      }

      return res.send(user[0][0]);
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
  const { email, name, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => dbConnection.query('INSERT INTO users (email, name, password) VALUES (?, ?, ?)', [email, name, hash]))
    .then((newUser) => dbConnection.query('SELECT email, name FROM users WHERE user_id = ?', [newUser[0].insertId])
      .then((user) => res.status(CREATED_CODE).send(user[0][0])))
    .catch((err) => {
      if (err.errno === 1062) {
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

  return dbConnection.query('SELECT * FROM users WHERE email = ?', [email])
    .then((user) => {
      if (!user[0][0]) {
        throw new AuthError(authDataErrorMessage);
      }

      return bcrypt.compare(password, user[0][0].password).then((matched) => {
        if (!matched) {
          throw new AuthError(authDataErrorMessage);
        }

        return user[0][0];
      });
    })
    .then((user) => {
      const token = jwt.sign(
        { id: user.user_id },
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

  return dbConnection.query('UPDATE users SET name = ?, email = ? WHERE user_id = ?', [name, email, id])
    .then(() => dbConnection.query('SELECT name, email FROM users WHERE user_id = ?', [id]))
    .then((user) => {
      if (!user[0][0]) {
        throw new NotFoundError(userNotFoundMessage);
      }

      return res.send(user[0][0]);
    })
    .catch((err) => {
      if (err.errno === 1062) {
        next(new ConflictError(dublicateEmailErrorMessage));
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new IncorrectRequestError(updateUserErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers, createUser, login, updateUserData, getProfileData,
};
