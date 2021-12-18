const ServerRoles = require('./../models/ServerRoles');
const ServerPermissions = require('../models/ServerPermissions');
const User = require('../models/User');
const { green, red } = require('colors');

const seqNumber = 3;
const seed = async () => {
    const result = await ServerPermissions.find();
    const resultt = await User.find();
    console.log(resultt[0]._id);
    let ids = [];
    await result.forEach(element => {
        ids.push(element._id);
    });
    ids.push(resultt[0]._id)
    await ServerRoles.create({ permissions: ids, name: 'testRole' });
    await console.log(`${red(seqNumber)} : ${green('ServerRoles seed done')}`);
}


module.exports = {
    seqNumber,
    seed
}