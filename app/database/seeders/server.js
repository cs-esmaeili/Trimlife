const Server = require('./../models/Server');
const User = require('../models/User');
const Role = require('../models/Role');
const Category = require('../models/Category');
const { green, red } = require('colors');

const seqNumber = 6;
const seed = async () => {
    let result = await Role.find();
    let roles = [];
    await result.forEach(element => {
        roles.push(element._id);
    });
    result = await User.find();
    let users = [];
    let usersRoles = [];
    await result.forEach(element => {
        users.push(element._id);
        // usersRoles.push({ user_id: element._id, role_id: roles[Math.floor(Math.random() * roles.length)] })
        usersRoles.push({ user_id: element._id, role_id: roles[0] })
        usersRoles.push({ user_id: element._id, role_id: roles[1] })
    });
    result = await Category.find();
    await Server.create({ users, roles, usersRoles, list: [result[0]._id], name: "Server Test 1" });
    await Server.create({ users, roles, usersRoles, list: [result[1]._id], name: "Server Test 2" });
    await console.log(`${red(seqNumber)} : ${green('Server seed done')}`);
}


module.exports = {
    seqNumber,
    seed
}