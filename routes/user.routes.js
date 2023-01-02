module.exports = app => {
    const {upload,createUser,finduser,updateUser}= require("../controller/user.controller");
     var router = require("express").Router();
     const express = require('express');
     app.use(express.static(__dirname + '/public'));
     app.use('/upload', express.static('upload'))
    
    router.post("/createuser",upload.single("image"),createUser);
    
 
    router.get("/:id?", finduser);
    router.put("/:id?",upload.single("image"), updateUser);

    app.use('/api/user', router);
  };
