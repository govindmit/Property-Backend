
module.exports = app => {

    const role = require("../controller/role.controller");
    var router = require("express").Router();
  

    router.post("/createrole", role.createRole);
    router.get("/getrole/:id?",role.findAllRoles);
    router.post('/genrateToken', role.getAuthToken)
    app.use('/api/role', router);
  };
  
