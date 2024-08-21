const { dbConnection } = require("../utils/config");
const { noteNotFoundErrorMessage, noAccessErrorMessage, CREATED_CODE } = require("../utils/constants");

const createNote = (req, res, next) => {
    const userId = req.user.id;
    const { title, content, list, color} = req.body;

    return dbConnection.query('INSERT INTO notes (title, content, list, color, owner) values (?, ?)', [title, content, list, color, userId])
    .then(newNote => res.status(CREATED_CODE).send(newNote[0]))
    .catch(next);
};

const deleteNoteById = (req, res, next) => {
    const { noteId } = req.params;

    return dbConnection.query('SELECT FROM notes WHERE id = ?', [noteId])
    .then(note => {
        if(!note[0]) {
            throw new NotFoundError(noteNotFoundErrorMessage);
        }

        if(list.owner !== req.user.id) {
            throw new ForbbidenError(noAccessErrorMessage);
        }

        return dbConnection.query('DELETE FROM notes WHERE id = ?', [noteId])
        .then(deletedNote => res.send(deletedNote[0]));
    })
    .catch(next);
};

const updateNote = (req, res, next) => {
    const { noteId } = req.params;
    const { title, content, list, color} = req.body;

    return dbConnection.query('SELECT FROM notes WHERE id = ?', [noteId])
    .then(note => {
        if(!note[0]) {
            throw new NotFoundError(noteNotFoundErrorMessage);
        }

        if(list.owner !== req.user.id) {
            throw new ForbbidenError(noAccessErrorMessage);
        }

        return dbConnection.query('UPDATE notes SET title = ?, content = ?, list = ?, color = ? WHERE id = ?', [title, content, list, color, noteId])
        .then(updatedNote => res.send(updatedNote[0]));
    })
    .catch(next);
};

const getNotes = (req, res, next) => {
    return dbConnection.query('SELECT * FROM notes WHERE owner = ?', [req.user.id])
    .then(notes => res.send(notes[0]))
    .catch(next);
};

module.exports = { createNote, deleteNoteById, updateNote, getNotes };