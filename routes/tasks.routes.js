const router = require('express').Router()
const bcrypt = require('bcryptjs')
const UserModel = require("../models/User.model")
const TaskModel = require("../models/Task.model")
let silvi = false;
function showHideText() {
  console.log("The function is called when user clicked on the image.");
};

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

  TaskModel.create({ title, description, department, status: 'Todo', asignedTo, asignedBy })
    .then((tasks) => {
      res.redirect('/tasks')
    }).catch((err) => {
      next(err)
    });
})

// READ TASKS 
// show all tasks and status
router.get('/tasks', (req, res) => {
  silvi = false
  TaskModel.find()
    .populate("asignedTo")
    .then((tasks) => {
      res.render('index', { tasks, silvi })
    }).catch((err) => {
      next(err)
    });
})
router.post('/tasks', (req, res) => {
  silvi = true
  TaskModel.find()
    .populate("asignedTo")
    .then((tasks) => {
      res.render('index', { tasks, silvi })
    }).catch((err) => {
      next(err)
    });
})
//tasks detailes with edit and delete options 
// find and show details 
router.get('/tasks/:id', (req, res) => {
  const { id } = req.params
  silvi = true;
  TaskModel.findById(id)
    .populate("asignedTo")
    .populate("asignedBy")
    .then((tasks) => {
      res.render('auth/task-details', { tasks })
    }).catch((err) => {
      console.log(err)
    });
})
// update task
router.post('/tasks/:id', (req, res,) => {
  const { id } = req.params
  const { title, description, department, status, asignedTo, asignedBy } = req.body

  TaskModel.findByIdAndUpdate(id, { title, description, department, status: 'Todo', asignedTo, asignedBy })
    .then((tasks) => {
      res.redirect('/tasks')
    }).catch((err) => {
      next(err)
    });
})

// router.get('/testing', (req, res) => {
//   res.render('auth/task-details')
// })






module.exports = router;