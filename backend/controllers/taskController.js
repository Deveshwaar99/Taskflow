const { httpError } = require('../utils/error')
const Task = require('../models/task')
const taskSchemaValidate = require('../schemas/taskValidateSchema')

const getAllTasks = async (request, response, next) => {
  try {
    const tasks = await Task.find({ owner: request.user._id }).select({
      _id: 1,
      title: 1,
      description: 1,
      priority: 1,
      owner: 1,
    })

    if (!tasks) {
      throw new httpError()
    }
    response.send(tasks)
  } catch (error) {
    next(error)
  }
}

const addTask = async (request, response, next) => {
  try {
    // console.log('Recieved a req')
    const { error } = taskSchemaValidate(request.body)
    // console.log(error)
    if (error) {
      throw new httpError(error.message, 400)
    }
    // console.log('no errors in input')
    const task = new Task({ ...request.body, owner: request.user._id })
    // console.log('new task created' + task)
    await task.save()
    // console.log('task saved')
    response.status(201).send(task)
  } catch (error) {
    // console.log(error)
    next(error)
  }
}

const deleteTask = async (request, response, next) => {
  try {
    const id = request.params.id
    const task = await Task.findOneAndDelete({
      _id: id,
      owner: request.user._id,
    })
    if (!task) {
      throw new httpError('Task not found', 404)
    }
    response.status(204).json({ message: 'User deleted successfully' })
  } catch (error) {
    next(error)
  }
}

const editTask = async (request, response, next) => {
  try {
    const validKeys = ['title', 'description', 'priority']
    const update = request.body
    const isValid = Object.keys(update).every(key => validKeys.includes(key))
    if (!isValid) {
      throw new httpError('Invalid Update', 400)
    }
    const id = request.params.id
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    )
    if (!updatedTask) {
      throw new httpError('Task not found', 400)
    }
    response.status(200).send(updatedTask)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllTasks,
  addTask,
  deleteTask,
  editTask,
}
