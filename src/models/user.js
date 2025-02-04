module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
      'User',
      {
          firstName: {
              type: DataTypes.STRING,
              allowNull: false,
          },
          lastName: {
              type: DataTypes.STRING,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, 
            
          },
          password:{
                type:DataTypes.STRING,
                allowNull:false,
          },
          role:{
             type:DataTypes.STRING,
             defaultValue:"user"
          }
      },
      {
          tableName: 'users',
      }
  );

  console.log("✅ User model loaded:", User === sequelize.models.User); // Debugging

  return User;
};
