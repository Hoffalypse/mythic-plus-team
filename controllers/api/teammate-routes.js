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

  module.exports = router;