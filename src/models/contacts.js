module.exports=(sequelize,DataTypes)=>{
    const Contacts = sequelize.define(
      'Contacts',
      {
        // Model attributes are defined here
        permanent_address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        current_address: {
          type: DataTypes.STRING,
          // allowNull defaults to true
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        tableName: 'contacts',
    
      },
    );
    
    // `sequelize.define` also returns the model
    console.log(Contacts === sequelize.models.User);
    return Contacts
    
    }