const { createToken } = require("../../utils/token");
const User = require("../models/User");
const Token = require("../models/Token");

const token = createToken({ test: "test" }, "1h");
Token.create({ token }).then((result) => {
  
    User.create(
        {
            token_id: result._id,
            userName: { name: "javad", tag: "50501" }
            , password: "1010"
            , Biography: "manjavadam"
            , email: "cs.esmaeili1@gmail.com"
            , phoneNumber: "09137378601"
        }).then(() => {
            console.log('user created javad');
        })
});