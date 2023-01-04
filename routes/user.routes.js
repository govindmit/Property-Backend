module.exports = (app) => {
  const {
    upload,
    createUser,
    finduser,
    updateUser,
    signin,
    forgotPassword,
    sendforgetLink,
    resetPassword,
    // findAllUserWithSearch,
  } = require("../controller/user.controller");
  const authJwt = require("../helper/role.auth");

  var router = require("express").Router();
  const express = require("express");
  app.use(express.static(__dirname + "/public"));
  app.use("/upload", express.static("upload"));

  
  router.post("/signin", signin);
  router.post("/forgotpassword", sendforgetLink);
  router.put("/changepassword", [authJwt.verifyToken], resetPassword);
  router.post("/resetPassword", [authJwt.verifyResetToken], forgotPassword);
  
  // router.get("/getusers", findAllUserWithSearch);
  router.get("/:id?", finduser);
  router.post("/createuser", upload.single("profilePic"), createUser);
  router.put("/:id?", upload.single("profilePic"), updateUser);


  app.use("/api/user", router);
};
