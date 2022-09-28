const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Character } = require('../models');
const withAuth = require("../utils/auth");

router.get('/', async (req, res) => {
    try {
   
      res.render('landing');
      }
       catch (err) {
          res.status(500).json("show this");
  
        }
      }
  );


  router.get('/login', (req, res) => {
 
    res.render('login');
  });

  router.get('/team', (req, res) => {
 
    res.render('teams');
  });

  router.get('/character', (req, res) => {
 
    res.render('character');
  });
  // signup screen
 router.get('/signup', (req, res) => {
 
    res.render('signup');
  });
module.exports = router;