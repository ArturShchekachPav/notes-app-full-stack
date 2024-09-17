const { dbConnection } = require("../utils/config");

const getColors = (req, res, next) => {
    return dbConnection.query('SELECT * FROM colors')
    .then(colors => res.send(colors[0]))
    .catch(next);
};

const deleteColorById = (req, res, next) => {

};

const updateColor = (req, res, next) => {

};

const createColor = (req, res, next) => {

}

module.exports = { getColors, deleteColorById, updateColor, createColor};