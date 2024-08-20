const router = require('express').Router();
const {updateNote, createNote, deleteNote, getNotes} = require('../contollers/notes');

router.get('/', getNotes);
router.post('/', createNote);
router.delete('/', deleteNote);
router.put('/', updateNote);

module.exports = router;