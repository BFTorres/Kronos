const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('')
const Admin = require('')







// GET ROUTES


router.get('/profile', (req, res) => {
  let user = req.loggedInUser;
  res.render("/auth/profile.hbs", { user });
})

router.get('/signup', (req, res) => {
  res.render('auth/signup.hbs')
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

router.post('/signup', (req, res) => {
  const { username, password, confPassword } = req.body //confPassword
  let regexPw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
  if (!regexPw.test(password)) {
    res.render('index', { msg: 'Password must be 6 characters long, must have a number, and an uppercase Letter' })
    return
  }
  if (password !== confirmPassword) {
    res.render('index', { msg: 'Passwords do not match' })
    return
  }
  let salt = bcrypt.genSaltSync(12)
  let hash = bcrypt.hashSync(password, salt)

  User.findOne({ username: username })
    .then(user => {
      if (user) {
        res.render('index', { msg: 'username is taken' })
      } else {
        User.create({ username, password: hash })
          .then(() => {
            res.render("index.hbs", { msg: "signup has been successful" })
          }).catch(err => next(err));
      }

    })

})

router.post('/login',)




// !CUSTOM MIDDLEWARES
// !userInfo

const authorize = (req, res, next) => {
  /*let 
  if (req.session.userInfo){
    next()
} else {
  res.redirect('/signin)
}
*/
}

// !Check authorization! CM

// !change password?

// !delete user?

//





module.exports = router;