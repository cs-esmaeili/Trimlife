const mongoose = require("mongoose");
const { schema: logIn } = require("./validations/logInValidation");
const { schema: register } = require("./validations/registerValidation");
const Server = require("./Server");

const userNameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        max: 50,
        min: 4,
    },
    tag: {
        type: Number,
        required: true,
        trim: true,
        max: 9999,
        min: 1000,
    }
});
userNameSchema.index({ name: 1, tag: 1 }, { unique: true });

const userSchema = new mongoose.Schema({
    token_id: {
        type: mongoose.ObjectId
    },
    socket_id: {
        type: String,
        required: false,
    },
    userName: userNameSchema,
    password: {
        type: String,
        max: 50,
        min: 4,
        required: true,
        trim: true,
    },
    Biography: {
        type: String,
        max: 200,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        trim: true,
        index: true,
        unique: true,
        sparse: true,
    },
    image: {
        type: String,
    },
    status: {
        type: Boolean,
        required: true,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});


userSchema.statics.logInValidation = function (body) {
    return logIn.validate(body, { abortEarly: false });
};

userSchema.statics.registerValidation = function (body) {
    return register.validate(body, { abortEarly: false });
};


userSchema.statics.userChannels = async function (token_id) {
    const user = await this.findOne({ token_id });
    const userChannels = await Server.find({ users: { $in: [user._id] } }).populate({path: "list" , populate : {path : "channels"}}).select("list");

    return userChannels;
};


module.exports = mongoose.model("User", userSchema, 'user');