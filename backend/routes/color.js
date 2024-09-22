const router = require('express').Router();
const {
  getColors, deleteColorById, createColor, updateColor,
} = require('../contollers/colors');
const { createColorValidation, deleteColorValidation, updateColorValidation } = require('../utils/validation');

router.get('/', getColors);
router.delete('/:colorId', deleteColorValidation, deleteColorById);
router.patch('/:colorId', updateColorValidation, updateColor);
router.post('/', createColorValidation, createColor);

module.exports = router;
