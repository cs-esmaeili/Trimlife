const Role = require('./../models/Role');
const Permission = require('../models/Permission');
const { green, red } = require('colors');

const seqNumber = 3;
const seed = async () => {
    const result = await Permission.find();
    let ids = [];
    await result.forEach(element => {
        ids.push({permission_id: element._id });
    });
    await Role.create({ permissions: ids, name: 'everyone' });
    await Role.create({ permissions: ids, name: 'admin' });
    await console.log(`${red(seqNumber)} : ${green('Role seed done')}`);
}


module.exports = {
    seqNumber,
    seed
}