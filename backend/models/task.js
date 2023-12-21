const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: 2,
    },
    description: {
      type: String,
      // required: true,
      minlength: 5,
    },
    priority: {
      type: String,
      required: [true, 'Priority is required'],
      enum: ['LOW', 'MEDIUM', 'HIGH'],
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

taskSchema.pre('save', function (next) {
  this.priority = this.priority.toUpperCase()
  next()
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
