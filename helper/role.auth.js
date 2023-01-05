const db = require("../models");
const User = db.User;
const Role = db.Role;
const jwt = require('jsonwebtoken');
verifyToken = async (req, res, next) => {
    let token ;
    const seceret = process.env.SIGNING_KEY || 'cms_seceret';
    const header = req.headers['authorization'];
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        token = bearer[1];
        
    }
   if (!token) {
         return res.status(403).send({
           message: "No token provided!"
         });
       }
     
      const decode =  jwt.verify(token, seceret, (err, decoded) => {
         if (err) {
           return res.status(401).send({
             message: "the token is not valid !",
             subError:err.message
           });
         }
         req.userId = decoded.data.id;
         req.email  =decoded.data.email;
        });
       const user = await User.findByPk(req.userId);
       if(user){
        const role = await Role.findOne({where:{id:user.role}, attributes: {exclude: ['isDeleted']},});
        req.loginRole =role.dataValues.title
       }
     
       next();
     };
     

verifyResetToken = async (req, res, next) => {
      let token ;
      const seceret = process.env.SIGNING_KEY || 'cms_seceret';
      const header = req.headers['authorization'];
      if (typeof header !== 'undefined') {
          const bearer = header.split(' ');
          token = bearer[1];
          
      }
     if (!token) {
           return res.status(403).send({
             message: "No token provided!"
           });
         }
       
        const decode =  jwt.verify(token, seceret, (err, decoded) => {
           if (err) {
             return res.status(401).send({
               message: "the token is not valid !",
               subError:err.message
             });
           }
          
           req.email  =decoded.data.email;
          });
          next();
       };


    isAdmin = async (req, res, next) => {
        const user = await User.findByPk(req.userId);
        const role = await Role.findOne({where:{id:user.role}, attributes: {exclude: ['isDeleted']},});
              if (user && role.title !== 'Admin') {
                        res.status(403).send({
                            message: `Your role is ${role.title} !, To Acccess This Required Admin Role!`
                          });
                      return ;
              }
              req.loginRole =role.title
           next();
     };
     
     isSubscriber = async (req, res, next) => {
        const user = await User.findByPk(req.userId);
        const role = await Role.findOne({where:{id:user.role}, attributes: {exclude: ['isDeleted']},});
              if (user && role.title !== 'Subscriber') {
                        res.status(403).send({
                            message: `Your role is ${role.title} !, To Acccess This Required Subscriber Role!`
                          });
                      return ;
              }
             
           next();
     };
     isAuthor = async (req, res, next) => {
        const user = await User.findByPk(req.userId);
        const role = await Role.findOne({where:{id:user.role}, attributes: {exclude: ['isDeleted']},});
              if (user && role.title !== 'Author') {
          
                        res.status(403).send({
                            message: `Your role is ${role.title} !, To Acccess This Required Author Role!`
                          });
                      return ;
              }
             
           next();
     };
     isEditor = async (req, res, next) => {
        const user = await User.findByPk(req.userId);
        const role = await Role.findOne({where:{id:user.role}, attributes: {exclude: ['isDeleted']},});
              if (user && role.title !== 'Editor') {
                        res.status(403).send({
                            message: `Your role is ${role.title} !, To Acccess This Required Editor Role!`
                          });
                      return ;
              }
             
           next();
     };
     const authJwt = {
       verifyToken,
       isAdmin,
       isAuthor,
       isEditor,
       isSubscriber,
       verifyResetToken

      
     };
     module.exports = authJwt;
