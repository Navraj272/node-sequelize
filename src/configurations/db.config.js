const { Sequelize,DataTypes } = require('sequelize');

const sequelize = new Sequelize('AssociationsDB', 'postgres', 'N@vrajji272', {
    host: 'localhost',
    logging: false,
    dialect:'postgres'
     /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });

  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user')(sequelize,DataTypes);
db.contacts = require('../models/contacts')(sequelize,DataTypes);

// Associations
db.user.hasOne(db.contacts, { foreignKey: 'user_id' });
db.contacts.belongsTo(db.user, { foreignKey: 'user_id' });

db.sequelize.sync({ alter:true }).then(() => {
  console.log("Database synchronized.");
});

module.exports = db;