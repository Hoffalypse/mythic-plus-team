const router = require('express').Router();

const  {User}  = require('../../models');

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
          .json({ message: "You did not enter everything, try again" });
        return;
      }
      const validPassword = await dbUserData.checkPassword(req.body.password);
      
      if (!validPassword) {
        res
          .status(422)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.user_id = dbUserData.id;
        req.session.email = dbUserData.email;
        res
          .status(200)
          
          .json({ user: dbUserData, message: 'You are now logged in!' });  
      });
    } catch (err) {
      
      res.status(500).json("this was a total failure");
    }
  });

  //signup new account 
router.post('/signup', async (req, res) => {

    try {
      const dbUserData = await User.create({
        email: req.body.email,
        password: req.body.password,
      });
     
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.user_id = dbUserData.id;
        req.session.email = dbUserData.email;
  
        res.status(200).json(dbUserData);
      });
    } catch (err) {
      
      res.status(500).json("You did something wrong ");
    }
  });


module.exports = router;