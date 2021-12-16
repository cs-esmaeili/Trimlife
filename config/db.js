const mongoose = require('mongoose');

const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const clusterUrl = process.env.ClUSTERURL;
const authMechanism = process.env.AUTHMECHANISM;

const uri = `mongodb://${username}:${password}@${clusterUrl}/${process.env.DB_DATABASE}?authSource=admin&authMechanism=${authMechanism}`;
console.log(uri);

const connectDB = () => {
    // mongoose.connect('mongodb://localhost:27017/trimlife', {user : username , pass: password , dbName : process.env.DB_DATABASE})
    //     .then((result) => console.log('Connected To Database'))
    //     .catch(err => console.log(err));
    mongoose.connect(uri)
        .then((result) => console.log('Connected To Database'))
        .catch(err => console.log(err));

}

module.exports = connectDB;