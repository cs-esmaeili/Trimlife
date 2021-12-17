const Yup = require("yup");

exports.schema = Yup.object().shape({
    email: Yup.string()
        .email("ایمیل معتبر نمی باشد")
        .required("ایمیل الزامی می باشد"),
    userName: Yup.string()
        .min(4, "نام کاربری نباید کمتر از 4 کاراکتر باشد")
        .max(50, "نام کاربری نباید بیشتر از 255 کاراکتر باشد")
        .required("نام کاربری الزامی می باشد"),
    password: Yup.string()
        .min(4, "کلمه عبور نباید کمتر از 4 کاراکتر باشد")
        .max(50, "کلمه عبور نباید بیشتر از 255 کاراکتر باشد")
        .required("کلمه عبور الزامی می باشد"),
});
