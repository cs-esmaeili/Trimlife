const { createToken, checkToken } = require("../utils/token");
const User = require("../database/models/User");
const Token = require("../database/models/Token");


exports.handleLogin = async (req, res, next) => {
    try {
        await User.logInValidation(req.body);
        const { email, password, phoneNumber } = await req.body;
        const user = await User.findOne({ password, $or: [{ email }, { phoneNumber }] });
        if (!user) {
            const error = new Error();
            error.message = "نام کاربری یا رمز عبور نادرست می باشد";
            error.statusCode = 422;
            throw error;
        }
        const token = await createToken(JSON.parse(JSON.stringify(user)), "1h");
        const result = await Token.updateOne({ _id: user.token_id }, { token });
        if (!result.modifiedCount == 1) {
            const error = new Error();
            error.message = "مشکلی در وارد شدن به وجود آمد دوباره تلاش کنید";
            error.statusCode = 500;
            throw error;
        }
        res.json(token);
    } catch (err) {
        res.status(err.statusCode || 422).json(err.errors || err.message);
    }
}

exports.handleRegister = async (req, res, next) => {
    try {
        await User.registerValidation(req.body);
        const { email, userName, password } = await req.body;
        let user = await User.findOne({ email });
        if (user) {
            const error = new Error();
            error.message = "حساب کاربری با این مشخصات وجود دارد";
            error.statusCode = 422;
            throw error;
        }
        user = await User.findOne({ "userName.name": userName }).sort({ "userName.tag": -1 }).limit(1);
        let tag = (user !== null ? user.userName.tag : null);
        if (user) {
            if (tag === 9999) {
                const error = new Error();
                error.message = "نام کاربری  وجود دارد";
                error.statusCode = 422;
                throw error;
            }
        }
        tag = (tag === null ? 1000 : (tag + 1));
        let token = await createToken({ test: "test" }, "1h");
        let result = await Token.create({ token });
        result = await User.create(
            {
                token_id: result._id,
                userName: { name: userName, tag }
                , password
                , email
            });
        res.json(result);
    } catch (err) {
        res.status(err.statusCode || 422).json(err.errors || err.message);
    }
}