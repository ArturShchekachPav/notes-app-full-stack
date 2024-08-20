const router = require('express').Router();
const {updateNote, createNote, deleteNote, getNotes} = require('../contollers/notes');

router.get('/', getNotes);
router.post('/', createNote);
router.delete('/:noteId', deleteNote);
router.patch('/:noteId', updateNote);

module.exports = router;