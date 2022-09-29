const router = require('express').Router();
const { User, Character, Teammates } = require('../../models');
const withAuth = require('../../utils/auth');
const { capitalizeFirstLetter } = require('../../utils/helpers');

//--------------at api/characters--------------------------

router.get('/', (req, res) => {
  Character.findAll({
    include: { model: Teammates },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/', async (req, res) => {
  try {
    const newCharacter = await Character.create({
      name: capitalizeFirstLetter(req.body.name),
      role: req.body.role,
      avatar: req.body.avatar,
      char_class: req.body.char_class,
      spec: req.body.spec,
      ilvl: req.body.ilvl,
      current_m_score: req.body.current_m_score,
      region: req.body.region,
      realm: req.body.realm,
      user_id: req.session.user_id,
    });

    res.status(200).json(newCharacter);
  } catch (err) {
    res.status(420).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const data = await Character.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
      // include: [{model: Teammates}]
    });

    if (!data) {
      res.status(400).json({ message: 'No character with this id!' });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
