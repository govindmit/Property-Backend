const db = require("../models");
const Role = db.role;
const jsonwebtoken = require('jsonwebtoken');

// Create and Save a new role
exports.createRole = async (req, res) => {
  try {
    if (!req.body.title || !req.body.description) {
      res.status(400).send({
        message: "title and description is required !"
      });
      return;
    }
    else {
      const alreadyExistRole = await Role.findOne({ where: { title: req.body.title } })
      if (alreadyExistRole) {
        res.status(201).send({ message: 'role already exist' })
        return
      }
      // Create a role
      else {
        const role = {
          title: req.body.title,
          description: req.body.description,
          isDeleted: false
        };

        // Save Role in the database
        await Role.create(role)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message: err.message || "Some error occurred while creating the Role."
            });
          });
      }

    }


  } catch (error) {
    res.status(400).send({
      message: 'Oops ! something went wrong while creating the Role.',
      subError: error.message
    })
  }

};

// get all roles
exports.findAllRoles = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      await Role.findOne({ where: { id: id, isDeleted: false } })
        .then(data => {
          res.status(200).send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving role."
          });
        });
      return
    }
    await Role.findAll({ where: { isDeleted: false } })
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving roles."
        });
      });
  } catch (error) {
    res.status(400).send({
      message: "Some error occurred while retrieving roles.",
      subError: error.message
    })
  }

};

exports.getAuthToken = async(req,res)=>{
  const token = jsonwebtoken.sign({},'websecret',{expiresIn: "24h"});
  res.status(200).send({
    authToken:token
  });
}