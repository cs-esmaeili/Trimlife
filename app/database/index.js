const { connectDB } = require('../../config/database');
const migration = require('./models/');
const seed = require('./seeders');

exports.connect = async () => {
    await connectDB();
    await migration();
    await seed();
}