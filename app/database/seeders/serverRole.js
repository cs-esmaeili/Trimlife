const ServerRole = require('./../models/ServerRole');
const ServerPermission = require('../models/ServerPermission');
const { green, red } = require('colors');

const seqNumber = 3;
const seed = async () => {
    const result = await ServerPermission.find();
    let ids = [];
    await result.forEach(element => {
        ids.push({permission_id: element._id });
    });
    await ServerRole.create({ permissions: ids, name: 'everyone' });
    await ServerRole.create({ permissions: ids, name: 'admin' });
    await console.log(`${red(seqNumber)} : ${green('ServerRole seed done')}`);
}


module.exports = {
    seqNumber,
    seed
}