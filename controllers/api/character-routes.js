const router = require('express').Router();
const { User, Character, Teammates } = require('../../models');
const withAuth = require('../../utils/auth');

//--------------at api/characters--------------------------

router.get('/', (req, res) => {
  Character.findAll({
    // include: {model: Teammates}
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      res.status(500).json(err);
    });
});
router.post('/', async (req, res) => {
  try {
    console.log(req.body.name, req.session.user_id);
    const newCharacter = await Character.create({
      name: req.body.name,
      user_id: req.session.user_id,
    });
    console.log('made it coach');
    res.status(200).json(newCharacter);
  } catch (err) {
    res.status(420).json(err);
  }
});

module.exports = router;
