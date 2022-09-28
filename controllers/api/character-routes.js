const router = require('express').Router();
const  {User, Character,Teammates}  = require('../../models');
const withAuth = require("../../utils/auth");

//--------------at api/characters--------------------------

router.get('/',  (req, res) => {
  Character.findAll({
          // include: {model: Teammates}
      })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
          
          res.status(500).json(err);
      });
});
router.post('/',  async (req, res) => {
    try {
   
      const newCharacter = await Character.create({
        name: req.body.name,
        role: req.body.role,
        avatar: req.body.avatar,
        char_class: req.body.char_class,
        spec: req.body.spec,
        ilvl: req.body.ilvl,
        current_m_score: req.body.current_m_score,
        user_id: req.session.user_id,
        
      });
        console.log("made it coach");
      res.status(200).json(newCharacter);
    } catch (err) {
      res.status(420).json(err);
    }
  });


module.exports = router;