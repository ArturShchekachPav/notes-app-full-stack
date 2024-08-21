import { dbConnection } from "../utils/config";
import {CREATED_CODE, listNotFoundErrorMessage, noAccessErrorMessage} from "../utils/constants";
import NotFoundError from "../errors/not-found-error";
import ForbbidenError from "../errors/forbbiden-error";

const getLists = (req, res, next) => {
    return dbConnection.query('SELECT * FROM lists WHERE owner = ?', [req.user.id])
    .then(lists => res.send(lists[0]))
    .catch(next);
};

const createList = (req, res, next) => {
    const userId = req.user.id;

    return dbConnection.query('INSERT INTO lists (title, owner) values (?, ?)', [req.body.title, userId])
    .then(newList => res.status(CREATED_CODE).send(newList[0]))
    .catch(next);
};

const deleteListById = (req, res, next) => {
    const { listId } = req.params;

    return dbConnection.query('SELECT FROM lists WHERE id = ?', [listId])
    .then(list => {
        if(!list[0]) {
            throw new NotFoundError(listNotFoundErrorMessage);
        }

        if(list.owner !== req.user.id) {
            throw new ForbbidenError(noAccessErrorMessage);
        }

        return dbConnection.query('DELETE FROM lists WHERE id = ?', [listId])
        .then(deletedList => res.send(deletedList[0]));
    })
    .catch(next);
};

module.exports = { getLists, createList, deleteListById };