const Token = require('../../database/models/Token');
const User = require('../../database/models/User');
const { checkToken } = require('../../utils/token');

module.exports = (io, nameSpace) => {
    nameSpace.use(async (socket, next) => {
        const token = await socket.handshake.headers.token;
        // const token = socket.handshake.auth.token;
        // if (!checkToken(token)) {
        //     console.log('refused');
        //     next(new Error("توکن صحیح نمیباشد یا منقضی شده است"))
        // }
        const tokenObj = await Token.findOne({ token });
        const result = await User.findOneAndUpdate({ token_id: tokenObj._id }, { socket_id: socket.id });
        if (!result) {
            console.log('Server Error');
            next(new Error("مشکلی در ارتباط به وجود آمد دوباره تلاش کنید"));
        }
        next();
    });
}