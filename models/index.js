const User = require('./user');
const Character = require('./character');
const Teammates = require('./teammates');



Character.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete:"cascade"
    
  });

  User.hasMany(Character, {
    foreignKey: 'user_id',
    onDelete:"cascade"
  });

  Teammates.belongsTo(Character, {
    foreignKey: 'charcter_id',
    onDelete:"cascade"
    
  });

  Character.hasMany(Teammates, {
    foreignKey: 'charcter_id',
    onDelete:"cascade"
  });



module.exports = { 
    User, 
    Character,
    Teammates 
};
