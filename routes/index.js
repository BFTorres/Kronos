const router = require("express").Router();

const UserModel = require("../models/User.model")
const TaskModel = require("../models/Task.model")

/* GET home page */
// const departments = ['FrontOficce', 'Administration', 'Sales', 'FoodsBeverage', 'Housekeeping', 'Engineering', 'HumanRessources']
router.get('/', (req, res, next) => {
  // if (req.session.loggedInUser) {
  // if (req.session.loggedInUser.userType == "Manager") {
  //   res.redirect('/manager')
  // } else {
  //   res.redirect('/staff')
  // }
  // } else {
  res.render('index',);
  // }
});

router.post('/', (req, res, next) => {

})

module.exports = router;
