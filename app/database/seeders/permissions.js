const ServerPermission = require('../models/ServerPermission');
const { green , red } = require('colors');

const seqNumber = 2;
const seed = async () => {
    await ServerPermission.create({ name: 'per1' });
    await ServerPermission.create({ name: 'per2' });
    await ServerPermission.create({ name: 'per3' });
    await ServerPermission.create({ name: 'per4' });
    await console.log(`${red(seqNumber)} : ${green('ServerPermission seed done')}`);
}

module.exports = {
    seqNumber,
    seed
}