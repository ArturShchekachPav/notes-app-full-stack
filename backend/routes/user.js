const router = require('express').Router();
const { updateUserData, getUsers, getProfileData } = require('../contollers/users');
const { updateUserDataValidation } = require('../utils/validation');

router.patch('/me', updateUserDataValidation, updateUserData);
router.get('/', getUsers);
router.get('/me', getProfileData);

module.exports = router;
