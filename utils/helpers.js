const { ExpressHandlebars } = require("express-handlebars");

const roleIcon = (role) => {
  let roleImg = '';
  switch (role) {
    case 'tank':
      roleImg = './images/tank.png';
      break;
    case 'dps':
      roleImg = './images/dps.png';
      break;
    case 'healer':
      roleImg = './images/healer.png';
    default:
      break;
  }
  return roleImg;
};
// Handlebars.registerHelper("compile",function(num) {


// })
// program to convert first letter of a string to uppercase
const capitalizeFirstLetter = (str) => {
  const capitalized = str.replace(/^./, str[0].toUpperCase());
  return capitalized;
};

console.log(roleIcon('healer'));

module.exports = {
  format_time: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },
  roleIcon,
  capitalizeFirstLetter,
};
