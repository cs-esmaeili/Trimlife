const colors = require('colors');

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const models = [];


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    models.push(model);
  });

const migration = async () => {
  console.log('migration');
  if (process.env.NODE_ENV === "development") {
    models.map(async (value) => {
      await value.deleteMany({});
    });
    console.log(colors.red(`documents deleted`));
  }
}


module.exports = migration;