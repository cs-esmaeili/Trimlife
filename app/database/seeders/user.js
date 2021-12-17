const { createToken } = require("../../utils/token");
const User = require("../models/User");
const Token = require("../models/Token");

let token = createToken({ test: "test" }, "1h");
Token.create({ token }).then((result) => {

    User.create(
        {
            token_id: result._id,
            userName: { name: "javad", tag: "1000" }
            , password: "1010"
            , Biography: "manjavadam"
            , email: "cs.esmaeili@gmail.com"
            , phoneNumber: "09137378601"
        }).then(() => {
            console.log('user created javad');
        })
});
token = createToken({ test: "test" }, "1h");
Token.create({ token }).then((result) => {

    User.create(
        {
            token_id: result._id,
            userName: { name: "javad", tag: "1001" }
            , password: "1010"
            , Biography: "manjavadam"
            , email: "cs.esmaeili1@gmail.com"
            , phoneNumber: "09137378602"
        }).then(() => {
            console.log('user created javad');
        })
});
