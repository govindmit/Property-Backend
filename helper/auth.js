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

