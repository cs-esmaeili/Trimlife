const moment = require("jalali-moment");

exports.formatDate = (date) => {
    const time = moment(date).format("YYYY-MM-DD HH:mm:ss");
    return moment(time, 'YYYY-MM-DD HH:mm:ss')
        .locale('fa')
        .format('YYYY/MM/DD HH:mm:ss');
};

exports.now = () => {
    return moment().locale('fa').format('YYYY/MM/DD HH:mm:ss');
}