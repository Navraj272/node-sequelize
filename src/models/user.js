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
      },
      {
          tableName: 'users',
      }
  );

  console.log("✅ User model loaded:", User === sequelize.models.User); // Debugging

  return User;
};
