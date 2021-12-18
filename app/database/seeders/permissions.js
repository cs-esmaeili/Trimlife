const ServerPermissions = require('../models/ServerPermissions');
const { green , red } = require('colors');

const seqNumber = 2;
const seed = async () => {
    await ServerPermissions.create({ name: 'per1' });
    await ServerPermissions.create({ name: 'per2' });
    await ServerPermissions.create({ name: 'per3' });
    await ServerPermissions.create({ name: 'per4' });
    await console.log(`${red(seqNumber)} : ${green('ServerPermissions seed done')}`);
}

module.exports = {
    seqNumber,
    seed
}