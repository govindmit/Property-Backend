module.exports = app => {
  const { upload, createUser, finduser, updateUser, findAllUserWithSearch, deleteUser, signin, forgotPassword, sendforgetLink, resetPassword } = require("../controller/user.controller");
  const authJwt = require("../helper/role.auth");
  const { webProtected } = require('../helper/auth')
  var router = require("express").Router();
  const express = require('express');
  app.use(express.static(__dirname + '/public'));
  app.use('/upload', express.static('upload'))
  
  router.get("/getusers", webProtected, findAllUserWithSearch);
  router.post("/signin", signin);
  router.post("/createuser", webProtected, upload.single("profilPic"), createUser);
  router.get("/:id?", webProtected, finduser);
  router.delete("/deleteuser/:id?", webProtected, deleteUser);
  router.put("/:id?", webProtected, upload.single("profilPic"), updateUser);
  
  router.post("/forgotpassword", sendforgetLink);
  router.put("/changepassword", [authJwt.verifyToken], resetPassword);
  router.post("/resetPassword", [authJwt.verifyResetToken], forgotPassword);
 

  app.use("/api/user", router);
};

