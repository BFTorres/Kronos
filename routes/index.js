const router = require("express").Router();

const UserModel = require("../models/User.model")
const TaskModel = require("../models/Task.model")
/* GET home page */
departments = ['FrontOffice', 'Administration', 'Sales', 'FoodsBeverage', 'Housekeeping', 'Engineering', 'HumanRessources']
router.get("/", (req, res, next) => {
  if (req.loggedInUser) res.redirect('/main');
  else res.render("index", { departments });
});

router.post('/', (req, res, next) => {

  const { username, password, department, userType } = req.body

  UserModel.create({ username, password, department, userType })
    .then((response) => {
      console.log('User Added !')
      res.redirect('/')
    })
    .catch((err) => {

    });
})

module.exports = router;
