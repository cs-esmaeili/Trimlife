const Permission = require('../models/Permission');
const { green, red } = require('colors');

const seqNumber = 2;
const seed = async () => {
    //General  Server permissions
    await Permission.create({ name: 'View Channels', type: "Server" });
    await Permission.create({ name: 'Manage Channels', type: "Server" });
    await Permission.create({ name: 'Manage Roles', type: "Server" });
    await Permission.create({ name: 'View Logs', type: "Server" });
    await Permission.create({ name: 'Manage Server', type: "Server" });
    await Permission.create({ name: 'Change Nikname', type: "Server" });
    await Permission.create({ name: 'Kick Memebers', type: "Server" });
    await Permission.create({ name: 'Ban Memebers', type: "Server" });
    await Permission.create({ name: 'Move Members', type: "Server" });
    await Permission.create({ name: 'Adminstrator', type: "Server" });
    //General channel Permission
    await Permission.create({ name: 'View Channel', type: "GeneralChannel" });
    await Permission.create({ name: 'Manage Channel', type: "GeneralChannel" });
    await Permission.create({ name: 'Manage Permissions', type: "GeneralChannel" });
    //voice channel permission
    await Permission.create({ name: 'Create Invite', type: "VoiceChannel" });
    await Permission.create({ name: 'Connect', type: "VoiceChannel" });
    await Permission.create({ name: 'Speak', type: "VoiceChannel" });
    await Permission.create({ name: 'Video', type: "VoiceChannel" });
    await Permission.create({ name: 'Mute Members', type: "VoiceChannel" });
    await Permission.create({ name: 'Deafen Members', type: "VoiceChannel" });
    //Text Channel Permission
    await Permission.create({ name: 'Send Messages', type: "TextChannel" });
    await Permission.create({ name: 'Attach Files', type: "TextChannel" });
    await Permission.create({ name: 'Manage Messages', type: "TextChannel" });
    await Permission.create({ name: 'Read Message History', type: "TextChannel" });


    await console.log(`${red(seqNumber)} : ${green('Permission seed done')}`);
}

module.exports = {
    seqNumber,
    seed
}