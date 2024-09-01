const router = require('express').Router();
const {createUser, updateUserData} = require('../contollers/users');
const { updateUserDataValidation } = require('../utils/validation');

router.post('/', createUser);
router.patch('/me', updateUserDataValidation, updateUserData);

module.exports = router;