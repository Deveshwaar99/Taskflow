const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/userController')
const taskControllers = require('../controllers/taskController')
const userAuthentication = require('../middleware/userAuthentication')

router
  .route('/')
  .get(userControllers.getAllUsers)
  .post(userControllers.createUser)

router.post('/login', userControllers.loginUser)

router.use(userAuthentication)

router
  .route('/profile')
  .get(userControllers.getUser)
  .put(userControllers.editUser)
  .delete(userControllers.deleteUser)

router.post('/profile/logoutAll', userControllers.logoutAllDevices)
router.post('/profile/logout', userControllers.logOutUser)

router
  .route('/profile/task')
  .get(taskControllers.getAllTasks)
  .post(taskControllers.addTask)

router
  .route('/profile/task/:id')
  .patch(taskControllers.editTask)
  .delete(taskControllers.deleteTask)

router.use((err, req, response, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  response.status(statusCode).json({ error: message })
})

module.exports = router
