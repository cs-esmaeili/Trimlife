const Server = require('./../models/Server');
const User = require('../models/User');
const ServerRole = require('../models/ServerRole');
const Category = require('../models/Category');
const { green, red } = require('colors');

const seqNumber = 6;
const seed = async () => {
    let result = await ServerRole.find();
    let roles = [];
    await result.forEach(element => {
        roles.push(element._id);
    });
    result = await User.find();
    let users = [];
    await result.forEach(element => {
        users.push(element._id);
    });

    result = await Category.find();
    await Server.create({ users, roles, list: [result[0]._id], name: "Server Test 1" });
    await Server.create({ users, roles, list: [result[1]._id], name: "Server Test 2" });
    await console.log(`${red(seqNumber)} : ${green('Server seed done')}`);
}


module.exports = {
    seqNumber,
    seed
}