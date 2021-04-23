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

  UserModel.create({ username, password, department, userType })
    .then((response) => {
      console.log('User Added !')
      res.redirect('/')
    })
    .catch((err) => {

    });
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