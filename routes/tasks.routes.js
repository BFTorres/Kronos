const router = require('express').Router()
const bcrypt = require('bcryptjs')
const UserModel = require("../models/User.model")
const TaskModel = require("../models/Task.model")


departments = ['FrontOffice', 'Administration', 'Sales', 'FoodsBeverage', 'Housekeeping', 'Engineering', 'HumanRessources']

//CREATE NEW TASK 
router.get('/new-task', (req, res) => {

  UserModel.find()
    .then((data) => {
      res.render('auth/new-task.hbs', { data, departments })
    })
    .catch(err => next(err))

})

router.post('/new-task', (req, res, next) => {
  const { title, description, department, status, asignedTo, asignedBy } = req.body

  TaskModel.create({ title, description, department, status, asignedTo, asignedBy })
    .then((data) => {
      res.redirect('/')
    }).catch((err) => {
      next(err)
    });
})

// READ TASKS 
router.get('/tasks', (req, res) => {

  TaskModel.find()
    .populate("asignedTo")
    .then((data) => {
      res.render('index', { data })
    }).catch((err) => {
      next(err)
    });
})

module.exports = router;