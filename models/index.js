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
    idle: dbConfig.pool.idle,
  },
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.role = require("./role")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);
db.property = require("./property")(sequelize, Sequelize);
db.feedback = require("./feedback")(sequelize, Sequelize);
db.feedbackCustomer = require("./feedbackCustomer")(sequelize, Sequelize);


db.User.hasMany(db.property, {foreignKey: 'user_id'});
db.property.belongsTo(db.User, {foreignKey: 'user_id'})

db.role.hasMany(db.User, { foreignKey: "role_type" });
db.User.belongsTo(db.role, { foreignKey: "role_type" });

db.User.hasMany(db.feedback, { foreignKey: "user_id" });
db.feedback.belongsTo(db.User, { foreignKey: "user_id" });

db.feedback.hasMany(db.feedbackCustomer, { foreignKey: "feedback_id" });
db.feedbackCustomer.belongsTo(db.feedback, { foreignKey: "feedback_id" });




module.exports = db;
