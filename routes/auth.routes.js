const router = require('express').Router()
const bcrypt = require('bcryptjs')
const UserModel = require("../models/User.model")
const TaskModel = require("../models/Task.model")


departments = ['FrontOffice', 'Administration', 'Sales', 'FoodsBeverage', 'Housekeeping', 'Engineering', 'HumanRessources']



router.get('/profile', (req, res) => {
  let user = req.session.loggedInUser;
  let signupDate = req.session.loggedInUser.signedUp;
  res.render("/auth/profile.hbs", { user, signupDate });
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

router.post('/signup', (req, res) => {
  const { username, password, confPassword } = req.body //confPassword
  let regexPw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
    if (!regexPw.test(password)) {
      res.render('index', {msg: 'Password must be 6 characters long, must have a number, and an uppercase Letter'})
      return
    }
    if (password !== confirmPassword) {
      res.render('index', {msg: 'Passwords do not match'})
      return
    }
    let salt = bcrypt.genSaltSync(12)
    let hash = bcrypt.hashSync(password, salt)

    User.findOne({ username: username })
      .then(user => {
        if (user) {
          res.render('index', { msg: 'username is taken'})
        }else{
          User.create({ username, password: hash })
            .then(() => {
              res.render("index.hbs", { msg: "signup has been successful"})
            }).catch(err => next(err));
        }
        
      })
    })


router.post('/login', (req, res, next) => {
  const { username, password } = req.body
  User.findOne({ username: username})
      .then
})

      
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

router.post('/login',  (req, res, next) => {
  const { username, password } = req.body
  User.findOne({ username: username})
      .then(result => {
        if (result) {
          bcrypt.compare(password, result.password)
              .then(isCope => {
                if(isCope){
                  req.session.loggedInUser = result
                  res.redirect('/home')
                } else{
                  res.render('index', { msg: 'incorrect password'})
                }
              })
        } else { // username not existent
          res.render('index', { msg: 'username not found'})
        }
      })
        .catch(err => next (err))
    })

/*const authorizeInput = (req, res, next) => {
  let username = req.body.username
  let password = req.body.password
 // if (req.session.userInfo){
   if (!username || !password){
      res.render('index', {msg: 'please fill in all fields'})
   
    
} else {
  next()
  //res.redirect('/signin)
}
}
*/



// !change password?

// !delete user?







module.exports = router;