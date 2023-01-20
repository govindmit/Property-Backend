const {
  hashPassword,
  isValidPassword,
  generateToken,
} = require("../helper/auth");
const db = require("../models");
const multer = require("multer");
const { getImageUrl } = require("../helper/imageUpload");
const { DB } = require("../config/dbConfig");
const User = db.User;
const Feedback=db.feedback;
const FeedbackCustomer=db.feedbackCustomer;
const Role = db.role;
const Op = db.Sequelize.Op;
const fromEMail = "varun.mangoit@gmail.com"; 
const sendmail = require("sendmail")();

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
  const {
    brokerage_name,
    office_address,
    city,
    country,
    first_name,
    last_name,
    phone,
    gender,
    profile_pic,
    email,
    password,
    trakheesi_number,
    ORN,
    rera_number,
    BRN,
    passport,
    passport_expiry,
    organization_name,
    landline_phone,
    extension,
    no_of_property,
    status,
    role_type,
  } = req.body;
  try {
    let imagePath = "";
    if (req.file) {
      await getImageUrl(req.file).then((imgUrl) => {
        imagePath = imgUrl;
      });
    }

    const alreadyExistUser = await User.findOne({
      where: { email: email, is_deleted: false },
    });
    if (alreadyExistUser) {
      res.status(201).send({ message: "already exist with this email" });
      return;
    }
    const checkrole = await Role.findOne({ where: { id: role_type } });
    if (!checkrole) {
      res.status(201).send({ message: "role not exist!" });
      return;
    }
    var userRequest = {
      brokerage_name,
      office_address,
      city,
      country,
      first_name,
      last_name,
      phone,
      landline_phone,
      gender,
      profile_pic: imagePath,
      email,
      password: password,
      trakheesi_number,
      ORN,
      passport,
      passport_expiry,
      rera_number,
      BRN,
      organization_name,
      status,
      role_type,
    };

    await User.create(userRequest).then(async (response) => {
      let sendemail = response?.dataValues?.email;
      if (response?.dataValues?.password === undefined) {
        try {
          const token = await generateToken({
            email: sendemail,
          });
          res.status(200).cookie("x-access-token", token, {
            maxAge: 86400,
            secure: false,
            httpOnly: true,
          });
          sendmail(
            {
              to: sendemail,
              from: process.env.FROM_EMAIL || fromEMail, // Use the email address or domain you verified above
              subject: "Reset password Link",
              text: "reset password ",
              html: `<div style="padding:25px;box-shadow: 5px 5px 20px;margin-top:5px"><div style="text-align:center"><h2 style="margin-bottom:21px;">Password Reset</h2><p>If you have lost your password or wish to reset it,</p><p style="margin-top:-10px;margin-bottom:18px">use the link below to get started.</p><p><a href="https://property.mangoitsol.com/resetPassword?key=${token}" style="background:orangered;text-decoration:none !important; font-weight:700;border-radius:35px; color:#fff; font-size:12px;padding:11px 18px;display:inline-block;">Reset Your Password</a></p><p style="color:grey; margin-top:30px">If you did not request a password reset, you can safely ignore this email.</p></div></div>`,
            },
            function (err, reply) {
              res.status(200).send({
                message:
                  "The account create successfully and please check your email for creating your password",
              });
            }
          );
        } catch (error) {
          res.status(400).send({
            message: "Oops! something went wrong",
            subError: error.message,
          });
        }
      }
    });
  } catch (error) {
    res.status(400).send({
      message:
        error.message ||
        "Oops !something went wrong in while creating the user",
    });
  }
};

exports.finduser = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id : req.user_id;
    if (!id) {
      res.status(201).send({ message: "id is required !" });
      return;
    }
    const user = await User.findOne({
      where: { id: id, is_deleted: false },
      attributes: { exclude: ["password"] },
      // include: db.Role
    });
    if (!user) {
      res.status(201).send({ message: "user not found" });
      return;
    }
    const role = await Role.findOne({
      where: { id: user.role_type },
      attributes: { exclude: ["is_deleted"] },
    });
    user.role = role;
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({
      message: "Error retrieving user with id",
      subError: error.message,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(201).send({ message: "email and password are required !" });
      return;
    }
    const user = await User.findOne({
      where: { email: req.body.email, is_deleted: false },
    });
    if (!user) {
      res.status(201).send({ message: "user not exist with this email !" });
      return;
    }
    const role = await Role.findOne({
      where: { id: user.role_type },
      attributes: { exclude: ["is_deleted"] },
    });
    const validPasword = await isValidPassword(password, user.password);
    if (!validPasword) {
      res.status(201).send({ message: "invalid password!" });
      return;
    }
    const userData = await User.findOne({
      where: { email: req.body.email, is_deleted: false },
      attributes: { exclude: ["password"] },
    });
    const newFeed = await FeedbackCustomer.findOne({
      include: [{ model: Feedback, include: [User], where: { user_id: user.id } }],
    });

    const token = await generateToken({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      role_type: role,

    });
    res
      .status(200)
      .cookie("x-access-token", token, {
        maxAge: 86400,
        secure: false,
        httpOnly: true,
      })
      .send({
        accessToken: token,
        data: userData,
        newFeed:newFeed
      });
  } catch (error) {
    res.status(400).send({
      message: "Oops ! something went wrong in login !",
      subError: error.message,
    });
  }
};

exports.sendforgetLink = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(201).send({
        message: "email is required !",
      });
      return;
    }
    const user = await User.findOne({
      where: { email: email, is_deleted: false },
    });
    if (!user) {
      res.status(201).send({ message: "User not exist with this email !" });
      return;
    }
    const token = await generateToken({
      email: email,
    });
    res.status(200).cookie("x-access-token", token, {
      maxAge: 86400,
      secure: false,
      httpOnly: true,
    });
    sendmail(
      {
        to: email,
        from: process.env.FROM_EMAIL || fromEMail, // Use the email address or domain you verified above
        subject: "Reset password Link",
        text: "reset password ",
        html: `<div style="padding:25px;box-shadow: 5px 5px 20px;margin-top:5px"><div style="text-align:center"><h2 style="margin-bottom:21px;">Password Reset</h2><p>If you have lost your password or wish to reset it,</p><p style="margin-top:-10px;margin-bottom:18px">use the link below to get started.</p><p><a href="https://property.mangoitsol.com/resetPassword?key=${token}" style="background:orangered;text-decoration:none !important; font-weight:700;border-radius:35px; color:#fff; font-size:12px;padding:11px 18px;display:inline-block;">Reset Your Password</a></p><p style="color:grey; margin-top:30px">If you did not request a password reset, you can safely ignore this email.</p></div></div>`,
      },
      function (err, reply) {
        res.status(200).send({
          message: "Mail Sent Successfully ! Please Check Your Email",
        });
      }
    );
  } catch (error) {
    res.status(400).send({
      message: "Oops! something went wrong in send forgot pasword link",
      subError: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { password, confirm_password } = req.body;
    if (!password || !confirm_password) {
      res
        .status(201)
        .send({ message: "password & confirm_password fields are required !" });
      return;
    }
    const user = await User.findOne({
      where: { email: req.email, is_deleted: false },
    });
    if (!user) {
      res.status(201).send({ message: "Email not exist !" });
      return;
    }
    if (password !== confirm_password) {
      res
        .status(201)
        .send({ message: "Password and confirm password are not matched" });
      return;
    }

    user.password = await hashPassword(confirm_password);
    user.save();
    res.status(200).send({
      message: "password change succesfully !",
    });
  } catch (error) {
    res.status(400).send({
      message: "Oops ! something went wrong in forgot password",
      subError: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { old_password, new_password, confirm_password } = req.body;
    if (!old_password || !new_password || !confirm_password) {
      res.status(201).send({
        message: "body should not be empty !",
      });
      return;
    }
    if (new_password !== confirm_password) {
      res.status(201).send({
        message: " new password and confirm password mismatched  !",
      });
      return;
    }
    const user = await User.findOne({
      where: { id: req.user_id, is_deleted: false },
    });
    const validPasword = await isValidPassword(old_password, user.password);
    if (!user) {
      res.status(201).send({ message: "user not found" });
      return;
    }

    if (!validPasword) {
      res.status(201).send({ message: "invalid old password!" });
      return;
    }
    var hashPlainText = await hashPassword(confirm_password);
    const data = {
      password: hashPlainText,
    };
    await User.update(data, { where: { id: req.user_id } })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "user password change successfully !",
          });
        } else {
          res.send({
            message: `Cannot change password user with email=${email}. Maybe user was not found !`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error reset password of  user with email=" + email,
        });
      });
  } catch (error) {
    res.status(400).send({
      message: "Oops! something went wrong while reset the password",
      subError: error.message,
    });
  }
};
//  ----------------------------------------------------------------------------
exports.findAllUserWithSearch = async (req, res) => {
  try {
    const filter = req.query.search;

    var condition = filter ? { [Op.or]: [ { email: filter },{ first_name: filter }, { last_name: filter }, { role_type: filter }, ], [Op.and]: [{ is_deleted: false }],}: { is_deleted: false };

    const users = await User.findAll({
      where: condition,
      include: [{ model: Feedback, include: [FeedbackCustomer] },db.role],
      attributes: { exclude: ["role_type", "password"] },
    });
    if (users.length === 0) {
      res.status(200).send({
        message: "No result found !",
      });
      return;
    }

    if (users.length === 0) {
      res.status(201).send({
        message: "users not found !",
        data: pages,
      });
      return;
    }

    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({
      message: "Oops! something went wrong while fetching the users",
      subError: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    let imagePath = "";
    if (req.file) {
      await getImageUrl(req.file).then((imgUrl) => {
        imagePath = imgUrl;
        body["profile_pic"] = imgUrl;
      });
    }

    try {
      User.findOne({ where: { id: id, is_deleted: false } })
        .then((userdata) => {
          if (!userdata) {
            res.status(400).send({ message: "user not found" });
          }

          var userRequest = {
            brokerage_name: body.brokerage_name,
            office_address: body.office_address,
            city: body.city,
            country: body.country,
            first_name: body.first_name,
            last_name: body.last_name,
            phone: body.phone,
            landline_phone: body.landline_phone,
            gender: body.gender,
            profile_pic: imagePath,
            email: body.email,
            trakheesi_number: body.trakheesi_number,
            ORN: body.ORN,
            rera_number: body.rera_number,
            BRN: body.BRN,
            passport: body.passport,
            passport_expiry: body.passport_expiry,
            rera_number: body.rera_number,
            organization_name: body.organization_name,
            extension: body.extension,
            no_of_property: body.no_of_property,
            role_type: body.role_type,
            status: body.status,
          };

          if (req.file === undefined) {
            userRequest.profile_pic = userdata.dataValues.profile_pic;
          }

          User.update(body, { where: { id: id } })
            .then((updatedData) => {
              res.status(200).send({
                message: "user details updated successfully..",
                data: updatedData,
              });
            })
            .catch((err) => {
              res.status(400).send({
                errMessage: "user not updated ",
                subError: err.message,
              });
            });
        })
        .catch((err) => {
          res.status(400).send({ message: err.message });
        });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(201).send({ message: "user id not found" });
      return;
    }
    const userData = await User.findByPk(id);
    if (userData.dataValues.is_deleted === true) {
      res.status(201).send({ message: "already deleted." });
    } else {
      await User.update(
        { is_deleted: true },
        {
          where: { id: id },
        }
      )
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "successfully. deleted",
            });
          } else {
            res.send({
              message: `Cannot delete user with id=${id}. Maybe user was not found !`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error delete user with id=" + id,
          });
        });
    }
  } catch (error) {
    res.status(400).send({
      message: "Oops! something went wrong in delete the user " + id,
      subError: error.message,
    });
  }
};
////////////////////////////////////////////////////////////////////////

exports.registration = async (req, res) => {
  const {
    brokerage_name,
    office_address,
    city,
    country,
    first_name,
    last_name,
    phone,
    gender,
    profile_pic,
    email,
    password,
    trakheesi_number,
    ORN,
    rera_number,
    BRN,
    passport,
    passport_expiry,
    organization_name,
    landline_phone,
    extension,
    brokerage_email,
    no_of_property,
    role_type,
    address_line,
    number_of_locality,
    locality_name,
    brokerage_id,
    licensing_emmirate,
    property_manage,
    customer_feedback,
  } = req.body;
  try {
    let imagePath = "";
    if (req.file) {
      await getImageUrl(req.file).then((imgUrl) => {
        imagePath = imgUrl;
      });
    }

    const alreadyExistUser = await User.findOne({
      where: { email: email, is_deleted: false },
    });
    if (alreadyExistUser) {
      res.status(201).send({ message: "already exist with this email" });
      return;
    }
    const checkrole = await Role.findOne({ where: { id: role_type } });
    if (!checkrole) {
      res.status(201).send({ message: "role not exist!" });
      return;
    }
    var hashPlainText = await hashPassword(password); // encrypted
    var userRequest = {

      brokerage_name,
      office_address,
      city,
      country,
      first_name,
      last_name,
      phone,
      gender,
      profile_pic: imagePath,
      email,
      password: hashPlainText,
      trakheesi_number,
      ORN,
      rera_number,
      BRN,
      passport,
      passport_expiry,
      organization_name,
      landline_phone,
      extension,
      brokerage_email,
      no_of_property,
      role_type,
      address_line,
      number_of_locality,
      locality_name,
      brokerage_id,
      licensing_emmirate,
      property_manage,
      customer_feedback,
    };
    await User.create(userRequest)
      .then(async (response) => {
        if (response) {
            // const newFeed = await FeedbackCustomer.findOne({
            //   include: [{ model: Feedback, include: [User], where: { user_id: response.dataValues.id } }],
            // });
          
            const token = await generateToken({
              id: response.dataValues.id,
              email: response.dataValues.email,
              first_name: response.dataValues.first_name,
              last_name: response.dataValues.last_name,
              role_type: role_type,
            });
            res
              .status(200)
              .cookie("x-access-token", token, {
                maxAge: 86400,
                secure: false,
                httpOnly: true,
              })
              .send({
                accessToken: token,
                data: response.dataValues,
                // newFeed:newFeed
              });
        }
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  } catch (error) {
    res.status(400).send({
      message:
        error.message ||
        "Oops !something went wrong in while creating the Account",
    });
  }
};
