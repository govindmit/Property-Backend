const { hashPassword } = require("../helper/auth");
const db = require("../models");
const multer = require('multer');
const { getImageUrl } = require("../helper/imageUpload");
// const { getImageUrl } = require("../helper/imageUpload");

const User = db.User;
const Role = db.Role;
const Op = db.Sequelize.Op;


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./upload/`);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

exports.upload = multer({ storage: storage });

exports.createUser = async (req, res) => {
    const { brokerageName, officeAddress, city, country, firstName, lastName, phone, gender, image, email, password, trakheesiNumber, ORN, reraNumber, BRN, organizationName, role } = req.body;
    try {
        let imagePath = "";
        if (req.file) {
            await getImageUrl(req.file).then(imgUrl => {
                imagePath = imgUrl;
            })
        }

        const alreadyExistUser = await User.findOne({ where: { email: email, isDeleted: false } });
        if (alreadyExistUser) {
            res.status(201).send({ message: 'User already exist with this email' })
            return
        }
        const checkrole = await Role.findOne({ where: { id: role } });
        if (!checkrole) {
            res.status(201).send({ message: 'role not exist!' })
            return
        }
        var hashPlainText = await hashPassword(password) // encrypted
        var userRequest = {
            brokerageName,
            officeAddress,
            city,
            country,
            firstName,
            lastName,
            phone,
            gender,
            image:imagePath,
            email,
            password:hashPlainText,
            trakheesiNumber,
            ORN,
            reraNumber,
            BRN,
            organizationName,
            role
        };

        await User.create(userRequest).then((response) => {
            if (response) {
                res.status(200).send({
                    message: "User created successfully",
                });
            }
        })
            .catch((error) => {
                res.status(500).send({ message: error.message });
            });
    } catch (error) {
        res.status(400).send({

            message: error.message || 'Oops !something went wrong in while creating the user',

        })
    }
};


// Find a single user with an id
exports.finduser = async (req, res) => {
    try {

        const id = req.params.id ? req.params.id : req.userId;
        if (!id) {
            res.status(201).send({ message: 'id is required !' })
            return
        }
        const user = await User.findOne({
            where: { id: id, isDeleted: false },
            attributes: { exclude: ['password'] },
            // include: db.Role
        });
        if (!user) {
            res.status(201).send({ message: 'user not found' })
            return
        }
        const role = await Role.findOne({ where: { id: user.role }, attributes: { exclude: ['isDeleted'] }, });
        user.role = role
        res.status(200).send(user)


    } catch (error) {
        res.status(400).send({
            message: 'Error retrieving user with id',
            subError: error.message
        })
    }


};

// exports.updateUser = async (req, res) => {
//     try {

//         const id = req.params.id ? req.params.id : req.userId;
//         const body = req.body;


//         if (!id) {
//             res.status(201).send({ message: 'id is required !' })
//             return
//         }
//         if (!body) {
//             res.status(201).send({
//                 message: 'body should not be empty !'
//             })
//             return
//         }
//         const user = await User.findOne({ where: { id: id, isDeleted: false } });
//         if (!user) {
//             res.status(201).send({ message: 'user not found' })
//             return
//         }
//         body['updatedBy'] = req.userId
//         await User.update(body, { where: { id: id } }).then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "user updated successfully !"
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot update user with id=${id}. Maybe user was not found !`
//                 });
//             }
//         }).catch(err => {
//             res.status(500).send({
//                 message: "Error update user with id=" + id,
//                 subError: err.message
//             });
//         });

//     } catch (error) {
//         res.status(400).send({
//             message: 'Oops! something went wrong in update the user',
//             subError: error.message
//         })
//     }
// }

exports.updateUser = async (req, res) => {
    try {
  
      let imagePath = "";
      if (req.file) {
        await getImageUrl(req.file).then(imgUrl => {
          imagePath = imgUrl;
        })
      }
  
      const body = req.body;
      const id = req.params.id;
        try {
          User.findOne({  where: { id: id, isDeleted:false} }).then(userdata => {
            if (!userdata) {
              res.status(400).send({ message: 'user not found' })
            } 

                var userRequest = {
                    brokerageName: body.brokerageName,
                    officeAddress:body.officeAddress,
                    city:body.city,
                    country:body.country,
                    firstName:body.firstName,
                    lastName:body.lastName,
                    phone:body.phone,
                    gender:body.gender,
                    image:imagePath,
                    email:body.email,
                    trakheesiNumber:body.trakheesiNumber,
                    ORN:body.ORN,
                    reraNumber:body.reraNumber,
                    BRN:body.BRN,
                    organizationName:body.organizationName,
                 
                };
        
              if (req.file === undefined) {
                userRequest.image = userdata.image
              }
  
               User.update(userRequest, { where: { id: id } }).then(updatedData => {
                res.status(200).send({ message: 'user details updated successfully..' })
              }).catch(err => {
                res.status(400).send({ errMessage: "user not updated ", subError: err.message })
              })
            
          }).catch(err => {
            res.status(400).send({ message: err.message })
          })
  
        } catch (err) {
          res.status(400).send({ message: err.message })
        }
      
    }
    catch (err) {
      res.status(400).send({ message: err.message })
    }
  
  };