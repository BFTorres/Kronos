require("../db") //conection 2 separate database 

const mongoose = require("mongoose")
//  Insert Dept items to the DB
const Dept = require('../models/Dept.model')

const departments = { departments: { FrontOficce, Administration, Sales, FoodsBeverage, Housekeeping, Engineering, HumanRessources } }
// create Dept items
Dept.create(departments)
  .then(() => {
    console.log("Files Added Successfully ! ♥ ")
    return mongoose.connection.close()
  })
  .then(() => {
    console.log("Connection Terminated ! ♠")
  })
  .catch(() => {
    console.log("Oh NO!!!")
  })