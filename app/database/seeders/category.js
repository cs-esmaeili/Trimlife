const Category = require('../models/Category');
const Channel = require('../models/Channel');
const ServerPermission = require('../models/ServerPermission');
const { green, red } = require('colors');

const seqNumber = 5;
const seed = async () => {
    const channel_id = await Channel.find();

    let result = await ServerPermission.find();
    let ServerPermissions = [];
    await result.forEach(element => {
        ServerPermissions.push(element._id);
    });
    await Category.create({ channels: [channel_id[0]._id], permissions: ServerPermissions , name : "CategoryTest 1"});
    await Category.create({ channels: [channel_id[1]._id], permissions: ServerPermissions , name : "CategoryTest 2"});
    await console.log(`${red(seqNumber)} : ${green('Category seed done')}`);
}


module.exports = {
    seqNumber,
    seed
}