const mongoose = require('mongoose');

const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const clusterUrl = process.env.ClUSTERURL;
const authMechanism = process.env.AUTHMECHANISM;

const uri = `mongodb://${username}:${password}@${clusterUrl}/${process.env.DB_DATABASE}?authSource=admin&authMechanism=${authMechanism}`;

const connectDB = async () => {
    try {
        const result = await mongoose.connect(uri)
        console.log('Connected To Database');
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    connectDB,
    uri
};