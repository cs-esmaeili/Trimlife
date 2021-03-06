const Category = require('../models/Category');
const Channel = require('../models/Channel');
const Permission = require('../models/Permission');
const Role = require('../models/Role');
const { green, red } = require('colors');
const _ = require('lodash');

const seqNumber = 5;
const seed = async () => {
    const channel_id = await Channel.find();


    const result1 = await Role.find();
    let roles = [];
    await result1.forEach(element => {
        roles.push(element._id);
    });
    const result2 = await Permission.find();
    let permissions = [];
    await result2.forEach(element => {
        permissions.push({ role_id: roles[0]._id, permission_id: element._id, status: _.sample([true, false]) });
    });

    await Category.create({ channels: [channel_id[0]._id], rolesException: permissions , name : "CategoryTest 1"});
    await Category.create({ channels: [channel_id[1]._id], rolesException: permissions , name : "CategoryTest 2"});
    await console.log(`${red(seqNumber)} : ${green('Category seed done')}`);
}


module.exports = {
    seqNumber,
    seed
}