const router = require('express').Router();
const {getLists, createList, deleteListById} = require('../contollers/lists');
const { createListValidation, deleteListByIdValidation } = require('../utils/validation');

router.get('/', getLists);
router.post('/', createListValidation, createList);
router.delete('/:listId', deleteListByIdValidation, deleteListById);

module.exports = router;