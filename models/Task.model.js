const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  title: String,
  description: String,
  department: Array,
  asignUser: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Admin = model("Task", adminSchema);

module.exports = Task;
