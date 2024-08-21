const router = require('express').Router();
const {getLists, createList, deleteListById} = require('../contollers/lists');

router.get('/', getLists);
router.post('/', createList);
router.delete('/:listId', deleteListById);

module.exports = router;