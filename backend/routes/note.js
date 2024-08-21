const router = require('express').Router();
const {updateNote, createNote, deleteNoteById, getNotes} = require('../contollers/notes');

router.get('/', getNotes);
router.post('/', createNote);
router.delete('/:noteId', deleteNoteById);
router.patch('/:noteId', updateNote);

module.exports = router;