const { Schema, model } = require('mongoose')

let userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },

    department: {
      type: String,
      enum: ['Front Office', 'Administration', 'Sales', 'Foods Beverage', 'Housekeeping', 'Engineering', 'Human Ressources']
    },

    userType: {
      type: String,
      enum: ['Manager', 'Staff']
    }
  },
  {
    timestamps: true
  }
)

let User = model('User', userSchema)
module.exports = User