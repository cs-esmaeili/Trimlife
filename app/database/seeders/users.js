const { createToken } = require("../../utils/token");
const User = require("../models/User");
const Token = require("../models/Token");
const { green  , red} = require('colors');

const seqNumber = 1;
const seed = async () => {
    let token = await createToken({ test: "test" }, "1h");
    let result = await Token.create({ token });
    await User.create({
        token_id: result._id,
        userName: { name: "javad", tag: "1000" }
        , password: "1010"
        , Biography: "manjavadam"
        , email: "cs.esmaeili@gmail.com"
        , phoneNumber: "09137378601"
    });
    token = await createToken({ test: "test" }, "1h");
    result = await Token.create({ token });
    await User.create({
        token_id: result._id,
        userName: { name: "javad", tag: "1001" }
        , password: "1010"
        , Biography: "manjavadam"
        , email: "cs.esmaeili1@gmail.com"
        , phoneNumber: "09137378602"
    });
    await console.log(`${red(seqNumber)} : ${green('Users seed done')}`);
}


module.exports = {
    seqNumber,
    seed
}