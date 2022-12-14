const router = require('express').Router();
const { Character, Teammates } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('landing', { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json('show this');
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/teams/:id', withAuth, async (req, res) => {
  try {
    const editTeam = await Character.findByPk(req.params.id, {
      include: { model: Teammates },
    });
    const team = editTeam.get({ plain: true });

    console.log(team);
    res.render('teams', { team, loggedIn: true });
  } catch (err) {
    res.status(500).json('review update screen error');
  }
});

router.get('/character', withAuth, (req, res) => {
  Character.findAll({
    where: {
      user_id: req.session.user_id,
    },
  }).then((characterData) => {
    const characters = characterData.map((post) => post.get({ plain: true }));
    res.render('character', { characters, loggedIn: true });
  });
});

// signup screen
router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get('/oauth/userinfo', (req, res) => {
  router.get('/auth/bnet', passport.authenticate('bnet'));

  router.get(
    '/auth/bnet/callback',
    passport.authenticate('bnet', { failureRedirect: '/' }),
    function (req, res) {
      res.redirect('/');
    }
  );
  res.Json();
});
module.exports = router;
