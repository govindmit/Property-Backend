const dbConfig = require("../config/dbConfig.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.role = require("./role")(sequelize,Sequelize);
db.User = require("./user")(sequelize,Sequelize);

db.role.hasMany(db.User, {foreignKey: 'role'});
db.User.belongsTo(db.role, {foreignKey: 'role'})


module.exports = db;
