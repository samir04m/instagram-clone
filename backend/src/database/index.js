const Sequelize = require("sequelize");
const ConfigDB = require("../Config/database");

const connection = new Sequelize(ConfigDB);

module.exports = connection;