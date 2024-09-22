const router = require('express').Router();
const {
  getLists, createList, deleteListById, updateList,
} = require('../contollers/lists');
const { createListValidation, deleteListByIdValidation, updateListValidation } = require('../utils/validation');

router.get('/', getLists);
router.post('/', createListValidation, createList);
router.delete('/:listId', deleteListByIdValidation, deleteListById);
router.patch('/:listId', updateListValidation, updateList);

module.exports = router;
