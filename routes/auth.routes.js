const router = require('express').Router()
const bcrypt = require('bcryptjs')
const UserModel = require('../models/User.model.js')








// GET ROUTES

//!profile, insert multiple profiles
router.get('/profile', (req, res) => {
  let user = req.session.loggedInUser;
  let signupDate = req.session.loggedInUser.signedUp;
  res.render("/auth/profile.hbs", { user, signupDate });
})

router.get('/signup', (req, res) => {
  res.render('')
})

router.get('/login', (req, res) => {
  res.render('')
})

router.get('/logout', (req, res) => {
  req.session.destroy() //!session
  res.redirect('/')
})

router.get('/main', (req, res, next) => {
  let user = req.loggedInUser; //!session


})



// POST ROUTES 

router.post('/signup', authorizeInput, (req, res) => {
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

router.post('/login', authorizeInput, (req, res, next) => {
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


// !change password?

// !delete user?







module.exports = router;