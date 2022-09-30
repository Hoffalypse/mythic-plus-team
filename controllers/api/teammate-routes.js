const router = require('express').Router();
const { User, Character, Teammates } = require('../../models');
const withAuth = require('../../utils/auth');
const { capitalizeFirstLetter } = require('../../utils/helpers');

//---------------- at api/teammates------------------

router.get('/', (req, res) => {
  Teammates.findAll({})
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      res.status(500).json(err);
    });
});
router.post('/', async (req, res) => {
  try {
    const newTeammate = await Teammates.create({
      name: capitalizeFirstLetter(req.body.name),
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
})
  router.put('/', async (req, res) => {
    try{
    const noteData = await Teammates.update (
      {
        note: req.body.note
      },
      {
        where: {
          id: req.body.id
        },
      })
        res.json(noteData);
      
    }catch(err) {
      res.status(500).json(err); 
    };
 });

module.exports = router;
