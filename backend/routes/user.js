const router = require('express').Router();
const {createUser, updateUserData} = require('../contollers/users');

router.post('/', createUser);
router.put('/', updateUserData);

module.exports = router;