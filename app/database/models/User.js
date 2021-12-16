const mongoose = require("mongoose");
const { schema } = require("./validations/logInValidation");

const userNameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    tag: {
        type: String,
        required: true,
        trim: true,
    }
});
userNameSchema.index({ name: 1, tag: 1 }, { unique: true });

const userSchema = new mongoose.Schema({
    token_id: {
        type: mongoose.ObjectId
    },
    userName: userNameSchema,
    password: {
        type: String,
        max: 50,
        ming: 4,
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
    },
    phoneNumber: {
        type: String,
        max: 11,
        unique: true,
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
    return schema.validate(body, { abortEarly: false });
};

module.exports = mongoose.model("User", userSchema);