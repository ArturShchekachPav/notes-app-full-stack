const { dbConnection } = require('../utils/config');
const {
  CREATED_CODE, colorNotFoundErrorMessage,
} = require('../utils/constants');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');

const getColors = (req, res, next) => dbConnection.query('SELECT * FROM colors')
  .then((colors) => res.send(colors[0]))
  .catch(next);

const deleteColorById = (req, res, next) => {
  const { colorId } = req.params;

  return dbConnection.query('SELECT * FROM colors WHERE color_id = ?', [colorId])
    .then((color) => {
      if (!color[0][0]) {
        throw new NotFoundError(colorNotFoundErrorMessage);
      }

      return dbConnection.query('DELETE FROM colors WHERE color_id = ?', [colorId])
        .then(() => res.send({ message: 'Цвет успешно удален' }));
    })
    .catch(next);
};

const updateColor = (req, res, next) => {
  const { colorId } = req.params;
  const { hex, color } = req.body;

  return dbConnection.query('SELECT * FROM colors WHERE color_id = ?', [colorId])
    .then((selectedColor) => {
      if (!selectedColor[0][0]) {
        throw new NotFoundError(colorNotFoundErrorMessage);
      }

      return dbConnection.query('UPDATE colors SET color = ?, hex = ? WHERE color_id = ?', [color, hex, colorId])
        .then(() => dbConnection.query('SELECT * FROM colors WHERE color_id = ?', [colorId]))
        .then((updatedColor) => res.send(updatedColor[0][0]));
    })
    .catch(next);
};

const createColor = (req, res, next) => dbConnection.query('INSERT INTO colors (color, hex) values (?, ?)', [req.body.color, req.body.hex])
  .then((newColor) => dbConnection.query('SELECT * FROM colors WHERE color_id = ?', [newColor[0].insertId]))
  .then((newColor) => res.status(CREATED_CODE).send(newColor[0][0]))
  .catch((err) => {
    if (err.errno === 1062) {
      next(new ConflictError('Цвет с подобными параметрами уже существует'));
    } else {
      next(err);
    }
  });

module.exports = {
  getColors, deleteColorById, updateColor, createColor,
};
