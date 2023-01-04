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
  } = require("../controller/user.controller");
  const authJwt = require("../helper/role.auth");

  var router = require("express").Router();
  const express = require("express");
  app.use(express.static(__dirname + "/public"));
  app.use("/upload", express.static("upload"));

  router.post("/createuser", upload.single("profilePic"), createUser);

  router.post("/forgotpassword", sendforgetLink);
  router.put("/changepassword", [authJwt.verifyToken], resetPassword);
  router.post("/resetPassword", [authJwt.verifyResetToken], forgotPassword);

  router.get("/:id?", finduser);
  router.put("/:id?", upload.single("profilePic"), updateUser);
  router.post("/signin", signin);
  const {
    upload,
    createUser,
    finduser,
    updateUser,
    findAllUserWithSearch,
    deleteUser,
  } = require("../controller/user.controller");
  var router = require("express").Router();
  const express = require("express");
  app.use(express.static(__dirname + "/public"));
  app.use("/upload", express.static("upload"));

  router.post("/createuser", upload.single("profilPic"), createUser);

  router.get("/getusers", findAllUserWithSearch);
  router.get("/:id?", finduser);
  router.put("/:id?", upload.single("profilPic"), updateUser);

  app.use("/api/user", router);
};
