const router = require('express').Router();
const { default: axios } = require('axios');
const { Teammates } = require('../../models');
const withAuth = require('../../utils/auth');
const { capitalizeFirstLetter } = require('../../utils/helpers');

//---------------- at api/teammates------------------

router.get('/', withAuth, (req, res) => {
  Teammates.findAll({})
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/', withAuth, async (req, res) => {
  try {
    const response = await axios.get(
      `https://raider.io/api/v1/characters/profile?region=${req.body.region}&realm=${req.body.realm}&name=${req.body.name}&fields=gear%2Cguild%2Cmythic_plus_scores_by_season%3Acurrent`
    );

    const newTeammate = await Teammates.create({
      name: capitalizeFirstLetter(req.body.name),
      role: response.data.active_spec_role,
      avatar: response.data.thumbnail_url,
      char_class: response.data.class,
      spec: response.data.active_spec_name,
      ilvl: response.data.gear.item_level_equipped,
      current_m_score: response.data.mythic_plus_scores_by_season[0].scores.all,
      region: req.body.region,
      realm: req.body.realm,
      character_id: req.body.character_id,
    });

    res.status(200).json(newTeammate);
  } catch (err) {
    res.status(420).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const data = await Teammates.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!data) {
      res.status(400).json({ message: 'No teammate with this id!' });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put('/', withAuth, async (req, res) => {
  try {
    const noteData = await Teammates.update(
      {
        note: req.body.note,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    res.json(noteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
