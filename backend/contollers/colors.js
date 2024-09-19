const { dbConnection } = require("../utils/config");
const { CREATED_CODE, colorNotFoundErrorMessage } = require("../utils/constants");
const NotFoundError = require("../errors/not-found-error");

const getColors = (req, res, next) => {
    return dbConnection.query('SELECT * FROM colors')
        .then(colors => res.send(colors[0]))
        .catch(next);
};

const deleteColorById = (req, res, next) => {
    const { colorId } = req.params;

    return dbConnection.query('SELECT * FROM colors WHERE color_id = ?', [colorId])
        .then(color => {
            if (!color[0][0]) {
                throw new NotFoundError(colortNotFoundErrorMessage);
            }

            return dbConnection.query('DELETE FROM colors WHERE color_id = ?', [colorId])
                .then(deletedList => res.send(deletedList[0][0]));
        })
        .catch(next);
};

const updateColor = (req, res, next) => {
    const { colorId } = req.params;
    const { hex, color } = req.body;

    return dbConnection.query('SELECT * FROM colors WHERE color_id = ?', [colorId])
        .then(color => {
            if (!color[0][0]) {
                throw new NotFoundError(colorNotFoundErrorMessage);
            }

            return dbConnection.query('UPDATE colors SET color = ?, hex = ? WHERE color_id = ?', [color, hex, colorId])
                .then(() => dbConnection.query('SELECT * FROM colors WHERE color_id = ?', [colorId]))
                .then(updatedColor => res.send(updatedColor[0]));
        })
        .catch(next);
};

const createColor = (req, res, next) => {
    return dbConnection.query('INSERT INTO colors (color, hex) values (?, ?)', [req.body.color, req.body.hex])
        .then(newColor => res.status(CREATED_CODE).send(newColpr[0][0]))
        .catch(next);
}

module.exports = { getColors, deleteColorById, updateColor, createColor };