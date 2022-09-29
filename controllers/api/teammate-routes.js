const router = require('express').Router();
const { User, Character, Teammates } = require('../../models');
const withAuth = require('../../utils/auth');

//---------------- at api/teammates------------------

router.get('/', (req, res) => {
    Teammates.findAll({
      // include: {model: Teammates}
    })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        res.status(500).json(err);
      });
  });
  router.get('/:id',  async (req, res) => {
    try {
      
      const editTeam = await Character.findByPk(req.params.id, {
        include: [{model: Teammates}],
      });
      const team = editTeam.get({ plain: true });
     
      res.render('teams', {team, loggedIn: true});
      }
       catch (err) {
          res.status(500).json("review update screen error");
        }
      }
  );
  module.exports = router;