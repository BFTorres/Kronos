const router = require('express').Router()
const bcrypt = require('bcryptjs')
const UserModel = require("../models/User.model")
const TaskModel = require("../models/Task.model")


departments = ['FrontOffice', 'Administration', 'Sales', 'FoodsBeverage', 'Housekeeping', 'Engineering', 'HumanRessources']


// GET ROUTES

router.get('/profile', (req, res) => {
  let user = req.loggedInUser;
  res.render("/auth/profile.hbs", { user });
})



router.get('/login', (req, res) => {
  res.render('/')
})

router.get('/signup', (req, res) => {

  res.render("auth/signup", { departments });
})

router.get('/main', (req, res, next) => {
  let user = req.loggedInUser; //!session




})



// POST ROUTES 

router.post('/signup', (req, res, next) => {
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







// router.post('/login',)




// !CUSTOM MIDDLEWARES
// !userInfo

// const authorize = (req, res, next) => {
//   /*let 
//   if (req.session.userInfo){
//     next()
// } else {
//   res.redirect('/signin)
// }
// */
// }

// !Check authorization! CM

// !change password?

// !delete user?

//





module.exports = router;