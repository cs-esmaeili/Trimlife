const { createLogger, format, transports } = require('winston');
const appRoot = require("app-root-path");
// Import mongodb
require('winston-mongodb');


const options = {
    console: {
        level: "debug",
        handleExceptions: true,
        format: format.combine(
            format.colorize(),
            format.simple()
        ),
    },
    collection_system: {
        level: 'info',
        db: process.env.MONGODBURI,
        options: {
            useUnifiedTopology: true
        },
        collection: 'system_logs',
        format: format.combine(
            format.timestamp(),
            format.json())
    },
    collection_user: {
        level: 'info',
        db: process.env.MONGODBURI,
        options: {
            useUnifiedTopology: true
        },
        collection: 'user_logs',
        format: format.combine(
            format.timestamp(),
            format.json())
    },
    collection_admin: {
        level: 'info',
        db: process.env.MONGODBURI,
        options: {
            useUnifiedTopology: true
        },
        collection: 'admin_logs',
        format: format.combine(
            format.timestamp(),
            format.json())
    }
};

const systemlogger = new createLogger({
    transports: [
        new transports.Console(options.console),
        new transports.MongoDB(options.collection_system),
    ],
    exitOnError: false,
});

const adminlogger = new createLogger({
    transports: [
        new transports.MongoDB(options.collection_admin),
    ],
    exitOnError: false,
});

const userlogger = new createLogger({
    transports: [
        new transports.MongoDB(options.collection_user),
    ],
    exitOnError: false,
});

systemlogger.stream = {
    write: function (message) {
        systemlogger.info(message);
    },
};

module.exports = {
    systemlogger,
    adminlogger,
    userlogger
};
