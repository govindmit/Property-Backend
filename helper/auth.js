const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();


exports.generateToken = async (payload) => {
    const signingKey = process.env.SIGNING_KEY || 'cms_seceret';
   console.log(signingKey)
    const jwt = jsonwebtoken.sign(
        { data: payload },
        signingKey,
        { expiresIn: '24h'}
    );

    return jwt;
}
exports.hashPassword = async password => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    return hash;
}

exports.isValidPassword = async (submittedPassword, storedPassword) => {
    try {
        return await bcrypt.compare(submittedPassword, storedPassword) || false;
    } catch (error) {
        throw new Error(error);
    }
};


  exports.webProtected = async (req,res,next)=>{
    try{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
              token = req.headers.authorization.split(" ")[1];
              var decode = jsonwebtoken.verify(token,"websecret")
              next();
        }else{
            res.status(400).send({
                message:'please provide auth token'
               })
        }  
    }catch(error){
        res.status(400).send({
            message:"Oops! something went wrong Auth token is expired!",
            subError:error.message
        })
    }
};