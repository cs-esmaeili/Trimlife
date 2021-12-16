const jwt = require("jsonwebtoken");
const appRoot = require('app-root-path');
const fs = require("fs");

exports.createToken = (payload, expTime) => {
    const privateKey = fs.readFileSync(`${appRoot}/key/private.key`);
    const token = jwt.sign(payload, privateKey, {
        algorithm: "RS256",
        expiresIn: expTime,
    });
    return token;
};

exports.checkToken = (token) => {
    const publicKey = fs.readFileSync(`${appRoot}/key/public.key`);
    try {
        const check = jwt.verify(token, publicKey, {
            algorithm: "RS256",
        });
        return check;
    } catch (error) {
        console.log(error);
        return false;
    }
}