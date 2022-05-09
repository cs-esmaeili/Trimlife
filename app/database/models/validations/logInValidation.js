const Yup = require("yup");

const messages = (item, value = null) => {
    const temp = {
        min: `کم تر از ${value} کارکتر نباید باشد`,
        max: `بیشتر از ${value} کارکتر نباید باشد`,
        required: "پرکردن این فیلد الزامی میباشد",
        accepted: "فایل انتخاب نشده است",
        email: "فرمت وارد شده ایمیل نمی باشد",
        moreThan: `مقدار این فیلد باید بیشتر از فیلد ${value} باشد`,
        imageRequired: 'باید تصویری انتخاب شود',
        selectRequired: 'باید یکی از گزینه ها انتخاب شود',
        usernameWrong: "فرمت ایمیل/شماره تلفن صحیح نمی باشد",
    }
    return temp[item];
}

exports.schema = Yup.object().shape({
    password: Yup.string()
        .min(4, messages('min', 4))
        .max(255, messages('max', 255))
        .required(messages('required')),
    username: Yup.string("Enter your Email/Phone Number")
        .required(messages('required'))
        .test('test-name', messages('usernameWrong'),
            function (value) {
                const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                const phoneRegex = /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/ig;
                let isValidEmail = emailRegex.test(value);
                let isValidPhone = phoneRegex.test(value);
                if (isValidPhone) {
                    if (isNaN(value)) {
                        return false;
                    }
                }
                if (!isValidEmail && !isValidPhone) {
                    return false;
                }
                return true;
            })
});