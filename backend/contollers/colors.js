import { dbConnection } from "../utils/config";

const getColors = (req, res, next) => {
    return dbConnection.query('SELECT * FROM colors')
    .then(colors => res.send(colors[0]))
    .catch(next);
};

module.exports = { getColors };