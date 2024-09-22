const router = require('express').Router();
const {
  updateNote, createNote, deleteNoteById, getNotes,
} = require('../contollers/notes');
const { deleteNoteByIdValidation, updateNoteDataValidation } = require('../utils/validation');

router.get('/', getNotes);
router.post('/', createNote);
router.delete('/:noteId', deleteNoteByIdValidation, deleteNoteById);
router.patch('/:noteId', updateNoteDataValidation, updateNote);

module.exports = router;
