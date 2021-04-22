const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  title: String,
  description: String,
  department: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  asignUser: {
    type: String,
    ref: 'User'
  }
});

const Task = model("Task", taskSchema);

module.exports = Task;
