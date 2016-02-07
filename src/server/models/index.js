import Sequelize from 'sequelize';

import userModel from './user';
//import all models

function importModel(sequelize, model) {
  return sequelize.import(model.name, (sequelize, DataTypes) => model(sequelize, DataTypes));
}
export default function(config){
  var sequelize = new Sequelize(config.name, config.user, config.password, {
    host : config.host,
    dialect : config.dialect,
    port : config.port,
    logging: config.logging
  });
  importModel = importModel.bind(this, sequelize);

  var db = {
    user: importModel(userModel)
    //add all imported models
  };

  Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  return db;
};