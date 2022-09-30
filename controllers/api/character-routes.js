const router = require('express').Router();
const { User, Character, Teammates } = require('../../models');
const withAuth = require('../../utils/auth');
const { capitalizeFirstLetter } = require('../../utils/helpers');
const axios = require('axios').default;

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

router.get('/:id', withAuth, async (req, res) => {
  try {
    const data = await Character.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
      ],
    });
    const character = data.get({ plain: true });
    res.status(200).json(character);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const response = await axios.get(
      `https://raider.io/api/v1/characters/profile?region=${req.body.region}&realm=${req.body.realm}&name=${req.body.name}&fields=gear%2Cguild%2Cmythic_plus_scores_by_season%3Acurrent`
    );
    console.log(response);
    console.log(response.data.class);
    const newCharacter = await Character.create({
      name: capitalizeFirstLetter(req.body.name),
      role: response.data.active_spec_role,
      avatar: response.data.thumbnail_url,
      char_class: response.data.class,
      spec: response.data.active_spec_name,
      ilvl: response.data.gear.item_level_equipped,
      current_m_score: response.data.mythic_plus_scores_by_season[0].scores.all,
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
