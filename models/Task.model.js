const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  title: String,

  description: String,

  department: {
    type: String,
    enum: ['Front Office', 'Administration', 'Sales', 'Foods Beverage', 'Housekeeping', 'Engineering', 'Human Ressources']
  },
  status: {
    type: String,
    enum: ["Todo", "In Progres", "Done"]
  },
  asignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  asignedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Task = model("Task", taskSchema);

module.exports = Task;
