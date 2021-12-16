const Yup = require("yup");

// exports.schema = Yup.object().shape({
//     email: Yup.string()
//         .email("ایمیل معتبر نمی باشد")
//         .required("ایمیل الزامی می باشد"),
//     password: Yup.string()
//         .min(4, "کلمه عبور نباید کمتر از 4 کاراکتر باشد")
//         .max(50, "کلمه عبور نباید بیشتر از 255 کاراکتر باشد")
//         .required("کلمه عبور الزامی می باشد"),
// });
exports.schema = Yup.object().shape({
    email: Yup.string().email().ensure().when('phoneNumber', {
        is: '',
        then: Yup.string().email().required()
    }),
    phoneNumber: Yup.string().ensure().when('email', {
        is: '',
        then: Yup.string().required()
    }),
    password: Yup.string()
        .min(4, "کلمه عبور نباید کمتر از 4 کاراکتر باشد")
        .max(50, "کلمه عبور نباید بیشتر از 255 کاراکتر باشد")
        .required("کلمه عبور الزامی می باشد"),

}, [['email', 'phoneNumber']]);