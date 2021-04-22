const { Schema, model } = require("mongoose");

const adminSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
});

const Admin = model("Admin", adminSchema);

module.exports = Admin;
