const router = require('express').Router();
const { User, Character, Teammates } = require('../../models');
const withAuth = require('../../utils/auth');

//---------------- at api/teammates------------------

router.get('/', (req, res) => {
    Teammates.findAll({    
    })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        res.status(500).json(err);
      });
  });
  router.post('/', async (req, res) => {
    try {
      const newTeammate = await Teammates.create({
        name: req.body.name,
        role: req.body.role,
        avatar: req.body.avatar,
        char_class: req.body.char_class,
        spec: req.body.spec,
        ilvl: req.body.ilvl,
        current_m_score: req.body.current_m_score,
        region: req.body.region,
        realm: req.body.realm,
        character_id: req.body.character_id,
      });
      
      res.status(200).json(newTeammate);
    } catch (err) {
      res.status(420).json(err);
    }
  });
  module.exports = router;