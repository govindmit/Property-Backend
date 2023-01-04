module.exports = app => {
  const { upload, createUser, finduser, updateUser, findAllUserWithSearch, deleteUser } = require("../controller/user.controller");
  var router = require("express").Router();
  const express = require('express');
  app.use(express.static(__dirname + '/public'));
  app.use('/upload', express.static('upload'))

  router.get("/getusers", findAllUserWithSearch);
  router.post("/createuser", upload.single("profilPic"), createUser);
  router.get("/:id?", finduser);
  router.put("/:id?", upload.single("profilPic"), updateUser);
  router.delete("/deleteuser/:id?", deleteUser);


  app.use('/api/user', router);
};
