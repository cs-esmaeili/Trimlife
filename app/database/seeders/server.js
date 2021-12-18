const Server = require('./../models/Server');
const User = require('../models/User');
const ServerRole = require('../models/ServerRole');
const { green, red } = require('colors');

const seqNumber = 4;
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
    await Server.create({ users, roles, name: "testServer" });
    await console.log(`${red(seqNumber)} : ${green('Server seed done')}`);
}


module.exports = {
    seqNumber,
    seed
}