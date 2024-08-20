const router = require('express').Router();
const {getLists, createList, deleteList} = require('../contollers/lists');

router.get('/', getLists);
router.post('/', createList);
router.delete('/', deleteList);

module.exports = router;