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

  TaskModel.create({ title, description, department, status: 'Todo', asignedTo, asignedBy })
    .then((tasks) => {
      res.redirect('/tasks')
    }).catch((err) => {
      next(err)
    });
})

// READ TASKS 
// show all tasks and status
router.get('/profile'/*!route name to be changed*/, (req, res) => {

  TaskModel.find()
    .populate("asignedTo")
    .then((tasks) => {
      res.render('index', { tasks })
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
router.get('/tasks/:id/edit', (req, res) => {
  const { id } = req.params
  TaskModel.findById(id)
    .populate('asignedTo')
    .populate('asignedBy')
    .then((tasks) => {
      UserModel.find()
        .then((users) => {
          res.render('auth/task-edit', { tasks, departments, users })
        }).catch((err) => {
          next(err)
        });
    })

})
router.post('/tasks/:id/edit', (req, res,) => {
  const { id } = req.params
  const { title, description, department, status, asignedTo, asignedBy } = req.body

  TaskModel.findByIdAndUpdate(id, { title, description, department, status, asignedTo, asignedBy })
    .then((tasks) => {
      res.redirect('/profile')
    }).catch((err) => {
      next(err)
    });
})

// delete

// when delete button is clicked it deletes the task
router.get('/tasks/:id/delete', (req, res) => {
  const { id } = req.params
  TaskModel.findByIdAndDelete(id)
    .then((result) => {
      res.redirect('/profile')
    }).catch((err) => {
      next(err)
    });
})






module.exports = router;