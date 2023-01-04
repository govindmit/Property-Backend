module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Varun@123",
  DB: "propter",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};