const router = require('express').Router()
const bcrypt = require('bcryptjs')
const UserModel = require("../models/User.model")
const TaskModel = require("../models/Task.model")


departments = ['FrontOffice', 'Administration', 'Sales', 'FoodsBeverage', 'Housekeeping', 'Engineering', 'HumanRessources']


// Validation
const validateEmpty = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.render("auth/signup.hbs", { msg: "Please fill all the fields !" });
  } else {
    next();
  }
};


// PRIVATE ROUTES
router.get('/profile', (req, res) => {
  let user = req.session.loggedInUser;
  //let signupDate = req.session.loggedInUser;
  res.render("/auth/profile.hbs", { user });
    
})


router.get('/signup', (req, res) => {

  res.render("auth/signup", { departments });
})

router.get('/main', (req, res, next) => {
  let user = req.loggedInUser; //!session
  res.render("auth/main.hbs")
})



// POST ROUTES 


// post signup
router.post('/signup', validateEmpty, (req, res, next) => {
  const { username, password, department, userType } = req.body

  // password encryption 
  let regexPw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
  if (!regexPw.test(password)) {
    res.render('auth/signup.hbs', { departments, msg: 'Password must be 6 characters long, must have a number, and an uppercase Letter' })
    return
  }
  let salt = bcrypt.genSaltSync(12)
  let hash = bcrypt.hashSync(password, salt)

  UserModel.findOne({ username: username })
    .then(user => {
      if (user) {
        res.render('auth/signup', { departments, msg: 'username is taken' })
      } else {
        UserModel.create({ username, password: hash, department, userType })
          .then(() => {
            res.redirect("/")
          }).catch(err => console.log(err));
      }

    }).catch(err => console.log(err));
})





    /* POST Login credentials */
router.post("/login", validateEmpty, (req, res, next) => {
  const { username, password } = req.body;

  UserModel.findOne({ username })
    .then((user) => {
      if (!user) {
        res.render("index", {
          msg: "Username or Password incorrect!",
        });
      } else {
        // check if password is correct
        bcrypt.compare(password, user.password).then((isMatching) => {
          if (isMatching) {
            req.app.locals.loggedInUser = true;
            req.session.loggedInUser = user;
            res.redirect("/main");
          } else {
            res.render("index.hbs", {
              msg: "Username or Password incorrect!",
            });
          }
        });
      }
    })
    .catch((err) => {
      next(err);
    });
});
    





// !change password?

// !delete user?







module.exports = router;