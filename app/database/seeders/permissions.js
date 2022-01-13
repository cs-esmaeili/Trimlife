const ServerPermission = require('../models/ServerPermission');
const { green , red } = require('colors');

const seqNumber = 2;
const seed = async () => {
    //role permissions
    await ServerPermission.create({ name: 'View Channels' });
    await ServerPermission.create({ name: 'Manage Channels' });
    await ServerPermission.create({ name: 'Manage Roles' });
    await ServerPermission.create({ name: 'View Logs' });
    await ServerPermission.create({ name: 'Manage Server' });
    await ServerPermission.create({ name: 'Change Nikname' });
    await ServerPermission.create({ name: 'Kick Memebers' });
    await ServerPermission.create({ name: 'Ban Memebers' });
    //channel permission
    await ServerPermission.create({ name: 'View Channel' });
    await ServerPermission.create({ name: 'Manage Channel' });
    await ServerPermission.create({ name: 'Manage Permissions' });
    await ServerPermission.create({ name: 'Create Invite' });
    await ServerPermission.create({ name: 'Connect' });
    await ServerPermission.create({ name: 'Speak' });
    await ServerPermission.create({ name: 'Video' });
    await ServerPermission.create({ name: 'Mute Members' });
    await ServerPermission.create({ name: 'Deafen Members' });
    await ServerPermission.create({ name: 'Move Members' });

    
    await ServerPermission.create({ name: 'Send Messages' });
    await ServerPermission.create({ name: 'Attach Files' });
    await ServerPermission.create({ name: 'Manage Messages' });
    await ServerPermission.create({ name: 'Read Message History' });
    
    await console.log(`${red(seqNumber)} : ${green('ServerPermission seed done')}`);
}

module.exports = {
    seqNumber,
    seed
}