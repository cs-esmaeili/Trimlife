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

exports.handleSingUp = async (req, res, next) => {

}