const router = require('express').Router();
const {getColors} = require('../contollers/colors');

router.get('/', getColors);

module.exports = router;