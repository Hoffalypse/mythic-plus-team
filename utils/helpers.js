const roleIcon = (role) => {
  let roleImg = '';
  switch (role) {
    case 'tank':
      roleImg = './assets/images/tank.png';
      break;
    case 'dps':
      roleImg = './assets/images/dps.png';
      break;
    case 'healer':
      roleImg = './assets/images/healer.png';
    default:
      break;
  }
  return roleImg;
};

console.log(roleIcon('healer'));

module.exports = {
  format_time: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },
  roleIcon,
};
