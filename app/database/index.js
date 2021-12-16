const connectDB = require('../../config/db');
const migration = require('./models/');
const seed = require('./seeders');

exports.connect = () => {
    connectDB();
    migration().then(() => {
        seed();
    });
}