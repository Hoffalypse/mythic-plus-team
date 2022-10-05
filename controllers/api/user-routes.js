const router = require('express').Router();
const { User, Character } = require('../../models');

const axios = require('axios').default;
const { URLSearchParams } = require('url');
const fetch = require('node-fetch');

const encodedParams = new URLSearchParams();

// ---------------------at api/users----------------------------

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'You did not enter everything, try again' });
      return;
    }
    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(422)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    encodedParams.set('user', process.env.BLZD_USER);
    encodedParams.set('password', process.env.BLZD_PASSWORD);
    encodedParams.set('grant_type', 'client_credentials');

    let url = 'https://oauth.battle.net/token';

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic MWM1Yjg5YzI4NDczNGJhMjkzOWJhNTFiM2FhZTYzMmE6czBoZFlKTlF0TTdrRVBsUzRqTEhJUnNLVVJqNWltNW4=',
      },
      body: encodedParams,
    };

    fetch(url, options)
      .then((res) => res.json())
      .then(function (data) {
        req.session.save(() => {
          req.session.token = data;
          req.session.loggedIn = true;
          req.session.user_id = dbUserData.id;
          req.session.email = dbUserData.email;
          res
            .status(200)

            .json({ user: dbUserData, message: 'You are now logged in!' });
        });
      })
      .catch((err) => console.error('error:' + err));
  } catch (err) {
    res.status(500).json('this was a total failure');
  }
});

//signup new account
router.post('/signup', async (req, res) => {
  try {
    const dbUserData = await User.create({
      email: req.body.email,
      password: req.body.password,
    });
    encodedParams.set('user', '1c5b89c284734ba2939ba51b3aae632a');
    encodedParams.set('password', 's0hdYJNQtM7kEPlS4jLHIRsKURj5im5n');
    encodedParams.set('grant_type', 'client_credentials');

    let url = 'https://oauth.battle.net/token';

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic MWM1Yjg5YzI4NDczNGJhMjkzOWJhNTFiM2FhZTYzMmE6czBoZFlKTlF0TTdrRVBsUzRqTEhJUnNLVVJqNWltNW4=',
      },
      body: encodedParams,
    };

    fetch(url, options)
      .then((res) => res.json())
      .then(function (data) {
        req.session.save(() => {
          req.session.token = data;
          req.session.loggedIn = true;
          req.session.user_id = dbUserData.id;
          req.session.email = dbUserData.email;
          res
            .status(200)

            .json({ user: dbUserData, message: 'You are now logged in!' });
        });

      });
  } catch (err) {
    res.status(500).json('You did something wrong ');
  }
});

//Find all users
router.get('/', (req, res) => {
  User.findAll({
    include: { model: Character },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      res.status(501).json(err);
    });
});
module.exports = router;
