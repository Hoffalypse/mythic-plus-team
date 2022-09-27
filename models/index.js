console.log("weeeeeeeeeeeee");
const User = require('./user');
console.log("weeeeeeeeeeeee");
const Character = require('./character');



Character.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete:"cascade"
    
  });

  User.hasMany(Character, {
    foreignKey: 'user_id',
    onDelete:"cascade"
  });

module.exports = { 
    User, 
    Character 
};
