const User = require('../models/user')
const { httpError } = require('../utils/error')
const multer = require('multer')
const Token = require('../models/tokens')
const hashPassword = require('../utils/hashPassword')
const {
  loginSchemaValidate,
  userSchemaValidate,
} = require('../schemas/userValidateSchema')

const getAllUsers = async (request, response, next) => {
  try {
    // console.log(request.headers)
    response.send('<h1>Welcome</h1>')
  } catch (error) {
    next(error)
  }
}

const getUser = async (request, response, next) => {
  try {
    const { _id, email, firstName, lastName } = request.user
    response.send({ _id, firstName, lastName, email })
  } catch (error) {
    next(error)
  }
}

const createUser = async (request, response, next) => {
  try {
    const { firstName, lastName, email, password } = request.body
    const { error } = userSchemaValidate({
      firstName,
      lastName,
      email,
      password,
    })
    if (error) {
      throw new httpError(error.details[0].message, 400)
    }
    //check whether eamil is already taken
    const emailExists = await User.find({ email })
    if (emailExists.length) {
      throw new httpError('Email is already taken', 400)
    }
    const user = new User({ firstName, lastName, email, password })
    user.password = await hashPassword(user.password)
    const tokenDocument = new Token({ userId: user._id })
    const token = await tokenDocument.getAuthToken()
    await user.save()

    response
      .status(201)
      .send({ _id: user._id, firstName, lastName, email, token })
  } catch (error) {
    // console.log(error)
    next(error)
  }
}

// const upload = multer({
//   limits: { fileSize: 5000000 },
//   fileFilter(request, file, cb) {
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
//       return cb(new Error('Please upload an image'))
//     }
//     cb(undefined, true)
//   },
// })

const logOutUser = async (request, response, next) => {
  // console.log('inside logout')
  try {
    request.tokenDocument.isActive = false
    await request.tokenDocument.save()
    response.status(200).json({ message: 'Logout Successfull' })
  } catch (error) {
    next(error)
  }
}

const logoutAllDevices = async (request, response, next) => {
  try {
    await Token.updateMany({ userId: request.user.id }, { isActive: false })
    response.status(200).json({ message: 'LogoutAll Successfull' })
  } catch (error) {
    next(error)
  }
}

const loginUser = async (request, response, next) => {
  try {
    const isValid = loginSchemaValidate(request.body)
    // console.log({isValid})
    if (isValid.error) {
      throw new httpError('Invalid email or Password', 400)
    }
    //verify User
    // console.log("valid schema")
    const user = await User.verifyLogin(
      request.body.email,
      request.body.password
    )
    // console.log(user)
    if (!user) {
      // console.log("inside if")
      throw new httpError('Invalid email or Password', 400)
    }
    // console.log(user)
    const tokenDocument = new Token({ userId: user._id })
    const token = await tokenDocument.getAuthToken()
    // const token = await user.getAuthToken()
    response.send({ _id: user._id, email: user.email, token })
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (request, response, next) => {
  try {
    await User.findOneAndDelete(request.user)
    response.status(204).json({ message: 'User deleted successfully' })
  } catch (error) {
    next(error)
  }
}

const editUser = async (request, response, next) => {
  const validKeys = ['firstName', 'lastName', 'email', 'password']
  const newUser = request.body
  const isValid = Object.keys(newUser).every((key) => validKeys.includes(key))
  if (!isValid) {
    return response.status(400).send({ error: 'Invalid Update' })
  }

  if (newUser.password) {
    newUser.password = await hashPassword(newUser.password)
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      request.user._id,
      newUser,
      {
        new: true,
      }
    )
    response.send(updatedUser)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllUsers,
  getUser,
  editUser,
  deleteUser,
  loginUser,
  logoutAllDevices,
  logOutUser,
  createUser,
}
