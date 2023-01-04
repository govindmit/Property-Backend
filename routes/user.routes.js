module.exports = app => {
  const { upload, createUser, finduser, updateUser, findAllUserWithSearch, deleteUser , signin,
    forgotPassword,
    sendforgetLink,
    resetPassword,} = require("../controller/user.controller");
    const authJwt = require("../helper/role.auth");
  var router = require("express").Router();
  const express = require('express');
  app.use(express.static(__dirname + '/public'));
  app.use('/upload', express.static('upload'))

  router.post("/signin", signin);
  router.get("/getusers", findAllUserWithSearch);
  router.post("/createuser", upload.single("profilPic"), createUser);
  router.get("/:id?", finduser);
  router.put("/:id?", upload.single("profilPic"), updateUser);
  router.delete("/deleteuser/:id?", deleteUser);
  
  router.post("/forgotpassword", sendforgetLink);
  router.put("/changepassword", [authJwt.verifyToken], resetPassword);
  router.post("/resetPassword", [authJwt.verifyResetToken], forgotPassword);
  

  app.use("/api/user", router);
};
