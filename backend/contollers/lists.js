const { dbConnection } = require('../utils/config');
const {
  CREATED_CODE, listNotFoundErrorMessage, noAccessErrorMessage, noteNotFoundErrorMessage,
  incorrectRequestErrorMessage,
} = require('../utils/constants');
const NotFoundError = require('../errors/not-found-error');
const ForbbidenError = require('../errors/forbbiden-error');
const ConflictError = require('../errors/conflict-error');
const IncorrectRequestError = require('../errors/incorrect-request-error');

const getLists = (req, res, next) => dbConnection.query('SELECT * FROM lists WHERE user_id = ?', [req.user.id])
  .then((lists) => res.send(lists[0]))
  .catch(next);

const createList = (req, res, next) => {
  const { id } = req.user;

  return dbConnection.query('INSERT INTO lists (list, user_id) values (?, ?)', [req.body.list, id])
    .then((newList) => dbConnection.query('SELECT * FROM lists WHERE list_id', [newList[0].insertId]))
    .then((newList) => res.status(CREATED_CODE).send(newList[0][0]))
    .catch((err) => {
      if (err.errno === 1062) {
        next(new ConflictError('У вас уже есть лист с таким названием'));
      } else {
        next(err);
      }
    });
};

const deleteListById = (req, res, next) => {
  const { listId } = req.params;

  return dbConnection.query('SELECT * FROM lists WHERE list_id = ?', [listId])
    .then((list) => {
      if (!list[0][0]) {
        throw new NotFoundError(listNotFoundErrorMessage);
      }

      if (list[0][0].user_id !== req.user.id) {
        throw new ForbbidenError(noAccessErrorMessage);
      }

      return dbConnection.query('DELETE FROM notes WHERE list_id = ?', [listId])
        .then(() => dbConnection.query('DELETE FROM lists WHERE list_id = ?', [listId])
          .then(() => res.send({ message: 'Лист успешно удален' })));
    })
    .catch(next);
};

const updateList = (req, res, next) => {
  const { listId } = req.params;
  const { list } = req.body;

  return dbConnection.query('SELECT * FROM lists WHERE list_id = ?', [listId])
    .then((selectedList) => {
      if (!selectedList[0][0]) {
        throw new NotFoundError(noteNotFoundErrorMessage);
      }

      if (selectedList[0][0].user_id !== req.user.id) {
        throw new ForbbidenError(noAccessErrorMessage);
      }
      return dbConnection.query('UPDATE lists SET list = ? WHERE list_id = ?', [list, listId])
        .then(() => dbConnection.query('SELECT * FROM lists WHERE list_id = ?', [listId]))
        .then((note) => res.send(note[0][0]));
    })
    .catch((err) => {
      if (err.errno === 1062) {
        next(new ConflictError('У вас уже есть лист с таким названием'));
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new IncorrectRequestError(incorrectRequestErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getLists, createList, deleteListById, updateList,
};
