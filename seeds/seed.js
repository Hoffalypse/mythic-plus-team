const sequelize = require('../config/connection');
const { User, Character, Teammates } = require('../models');

const userData = require('./userData.json');
const characterData = require('./characterData.json');
const teammatesData = require('./teammatesData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const character of characterData) {
    await Character.create({
      ...character,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  const data = await Character.findAll();

  const characters = data.map((character) => character.get({ plain: true }));

  for (const teammates of teammatesData) {
    await Teammates.create({
      ...teammates,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      character_id:
        characters[Math.floor(Math.random() * characters.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
