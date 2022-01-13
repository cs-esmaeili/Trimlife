const Channel = require('../models/Channel');
const ServerPermission = require('../models/ServerPermission');
const ServerRole = require('../models/ServerRole');
const { green, red } = require('colors');
const _ = require('lodash');

const seqNumber = 4;
const seed = async () => {
    const result1 = await ServerRole.find();
    let roles = [];
    await result1.forEach(element => {
        roles.push(element._id);
    });
    const result2 = await ServerPermission.find();
    let permissions = [];
    await result2.forEach(element => {
        permissions.push({ role_id: roles[0]._id, permission_id: element._id, status: _.sample([true, false]) });
    });
    await Channel.create({ rolesException: permissions, name: "Channel Test 1", type: 1 });
    await Channel.create({ rolesException: [], name: "Channel Test 2", type: 1 });
    await console.log(`${red(seqNumber)} : ${green('Channel seed done')}`);
}


module.exports = {
    seqNumber,
    seed
}
