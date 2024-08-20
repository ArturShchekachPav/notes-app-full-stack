const router = require('express').Router();
const {createUser, updateUserData} = require('../contollers/users');

router.post('/', createUser);
router.patch('/me', updateUserData);

module.exports = router;