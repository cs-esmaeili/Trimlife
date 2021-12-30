const Channel = require('../models/Channel');
const ServerPermission = require('../models/ServerPermission');
const { green, red } = require('colors');

const seqNumber = 4;
const seed = async () => {
    let result = await ServerPermission.find();
    let permissions = [];
    await result.forEach(element => {
        permissions.push(element._id);
    });
    await Channel.create({ permissions, name: "Channel Test 1", type: 1 });
    await Channel.create({ permissions, name: "Channel Test 2", type: 1 });
    await console.log(`${red(seqNumber)} : ${green('Channel seed done')}`);
}


module.exports = {
    seqNumber,
    seed
}
