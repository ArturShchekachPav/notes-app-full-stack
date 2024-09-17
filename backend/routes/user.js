const router = require('express').Router();
const {updateUserData, getUsers, getUserById} = require('../contollers/users');
const { updateUserDataValidation } = require('../utils/validation');


router.patch('/me', updateUserDataValidation, updateUserData);
router.get('/', getUsers);
router.get('/:id', getUserById);

module.exports = router;