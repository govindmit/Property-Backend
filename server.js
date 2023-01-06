const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const { getAuthToken } = require('./controller/role.controller');
require('dotenv').config({ path: __dirname + './env' })

const app = express();

var corsOptions = {
  origin: "*"
};
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("DB connected successfully..");
  })
  .catch((err) => {
    console.log("Failed to sync db ---: " + err.message);
  });
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({ message: "Backend Api is working fine!" });
});
app.post('/genrateToken', getAuthToken)

require("./routes/role.routes")(app);
require("./routes/user.routes")(app);



app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});