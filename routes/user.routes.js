module.exports = app => {
  const { upload, createUser, finduser, updateUser, findAllUserWithSearch, deleteUser } = require("../controller/user.controller");
  var router = require("express").Router();
  const express = require('express');
  app.use(express.static(__dirname + '/public'));
  app.use('/upload', express.static('upload'))

  router.post("/createuser", upload.single("profilPic"), createUser);


  router.get("/getusers", findAllUserWithSearch);
  router.get("/:id?", finduser);
  router.put("/:id?", upload.single("profilPic"), updateUser);


  app.use('/api/user', router);
};
