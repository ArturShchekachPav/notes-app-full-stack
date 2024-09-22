const { dbConnection } = require('../utils/config');
const { noteNotFoundErrorMessage, noAccessErrorMessage, CREATED_CODE } = require('../utils/constants');
const NotFoundError = require('../errors/not-found-error');
const ForbbidenError = require('../errors/forbbiden-error');

const createNote = (req, res, next) => {
  const { id } = req.user;

  return dbConnection.query('INSERT INTO notes (user_id, content) values (?, ?)', [id, '<p>Empty note</p>'])
    .then((newNote) => dbConnection.query('SELECT * FROM notes LEFT JOIN colors ON notes.color_id = colors.color_id LEFT JOIN lists ON notes.list_id = lists.list_id WHERE note_id = ?', [newNote[0].insertId]))
    .then((newNote) => res.status(CREATED_CODE).send(newNote[0][0]))
    .catch(next);
};

const deleteNoteById = (req, res, next) => {
  const { noteId } = req.params;

  return dbConnection.query('SELECT * FROM notes WHERE note_id = ?', [noteId])
    .then((note) => {
      if (!note[0][0]) {
        throw new NotFoundError(noteNotFoundErrorMessage);
      }

      if (note[0][0].user_id !== req.user.id) {
        throw new ForbbidenError(noAccessErrorMessage);
      }

      return dbConnection.query('DELETE FROM notes WHERE note_id = ?', [noteId])
        .then(() => res.send({ message: 'Заметка успешно удалена' }));
    })
    .catch(next);
};

const updateNote = (req, res, next) => {
  const { noteId } = req.params;
  const {
    note, content, list_id, color_id,
  } = req.body;

  return dbConnection.query('SELECT * FROM notes WHERE note_id = ?', [noteId])
    .then((selectedNote) => {
      if (!selectedNote[0][0]) {
        throw new NotFoundError(noteNotFoundErrorMessage);
      }

      if (selectedNote[0][0].user_id !== req.user.id) {
        throw new ForbbidenError(noAccessErrorMessage);
      }

      return dbConnection.query('UPDATE notes SET note = ?, content = ?, list_id = ?, color_id = ? WHERE note_id = ?', [note, content, list_id, color_id, noteId])
        .then(() => dbConnection.query('SELECT * FROM notes LEFT JOIN colors ON notes.color_id = colors.color_id LEFT JOIN lists ON notes.list_id = lists.list_id WHERE note_id = ?', [noteId]))
        .then((updatedNote) => res.send(updatedNote[0]));
    })
    .catch(next);
};

const getNotes = (req, res, next) => dbConnection.query('SELECT * FROM notes LEFT JOIN colors ON notes.color_id = colors.color_id LEFT JOIN lists ON notes.list_id = lists.list_id WHERE notes.user_id = ?', [req.user.id])
  .then((notes) => res.send(notes[0]))
  .catch(next);

module.exports = {
  createNote, deleteNoteById, updateNote, getNotes,
};
