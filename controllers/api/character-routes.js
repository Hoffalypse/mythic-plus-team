const router = require('express').Router();
const { Character, Teammates } = require('../../models');
const withAuth = require('../../utils/auth');
const { capitalizeFirstLetter } = require('../../utils/helpers');
const axios = require('axios').default;
const slug = require('slug');
const _ = require('lodash');

//--------------at api/characters--------------------------

router.get('/', withAuth, (req, res) => {
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
    const charData = await Character.findByPk(req.params.id, {});
    const char = charData.get({ plain: true });
    res.status(200).json(char);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const response = await axios.get(
      `https://raider.io/api/v1/characters/profile?region=${req.body.region}&realm=${req.body.realm}&name=${req.body.name}&fields=gear%2Cguild%2Cmythic_plus_scores_by_season%3Acurrent`
    );
    var options = {
      method: 'GET',
      url: `https://us.api.blizzard.com/profile/wow/character/${slug(
        req.body.realm
      )}/${_.lowerCase(req.body.name)}/character-media`,
      params: {
        namespace: `profile-${req.body.region}`,
        locale: `en_${req.body.region}`,
        access_token: `${req.session.token.access_token}`,
      },
    };
    var newRes = await axios(options);

    const newCharacter = await Character.create({
      name: capitalizeFirstLetter(req.body.name),
      role: response.data.active_spec_role,
      avatar: response.data.thumbnail_url,
      image: newRes.data.assets[3].value,
      char_class: response.data.class,
      spec: response.data.active_spec_name,
      ilvl: response.data.gear.item_level_equipped,
      current_m_score: response.data.mythic_plus_scores_by_season[0].scores.all,
      region: req.body.region,
      realm: req.body.realm,
      user_id: req.session.user_id,
    });

    const charArr = await Character.findAll({
      where: { name: `${req.body.name}`, user_id: req.session.user_id },
      include: { model: Teammates },
      raw: true,
      nest: true,
    });
    console.log(charArr);
    console.log(charArr[0].teammates.name);
    charArr.forEach(async (char) => {
      if (char.teammates.id == null) {
        await Teammates.create({
          name: capitalizeFirstLetter(req.body.name),
          role: response.data.active_spec_role,
          avatar: response.data.thumbnail_url,
          char_class: response.data.class,
          spec: response.data.active_spec_name,
          ilvl: response.data.gear.item_level_equipped,
          current_m_score:
            response.data.mythic_plus_scores_by_season[0].scores.all,
          region: req.body.region,
          realm: req.body.realm,
          character_id: char.id,
        });
      } else {
        return;
      }
    });

    res.status(200).json({ newCharacter });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const activeStatusOff = await Character.update(
      {
        is_active: false,
      },
      {
        where: {
          is_active: true,
        },
      }
    );
    const activeStatusOn = await Character.update(
      {
        is_active: true,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    res.status(200).json({ activeStatusOff, activeStatusOn });
  } catch (err) {
    res.status(500).json(err);
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
