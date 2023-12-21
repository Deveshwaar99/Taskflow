const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { string } = require('joi')

const entrySchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: 2,
      required: true,
    },
    lastName: {
      type: String,
      minlength: 2,
      required: true,
    },
    contact: {
      type: String,
      minlength: 10,
      maxlength: 10,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      toLowerCase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is not valid')
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      // select: false,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('Password cannot contain "password"')
        }
      },
    },
    avatar: {
      type: Buffer,
    },
  },

  {
    timestamps: true,
  }
)
//To verify whether the user is available in the database
entrySchema.statics.verifyLogin = async (email, password) => {
  // console.log("inside verifyLogin"+email+password)
  const user = await User.findOne({ email })

  if (!user) {
    return
  }
  // console.log('user is present')
  const isValid = await bcrypt.compare(password, user.password)
// console.log("is valid after password check"+isValid)
  if (!isValid) {
    return
  }
  // console.log('user is verified')
  return user
}
//To generate a token and save it in the database
// entrySchema.methods.getAuthToken = async function () {
//   const user = this
//   const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_KEY, {
//     expiresIn: '24h',
//   })
//   // user.tokens.push({ token })
//   await user.save()
//   return token
// }

//hashing the password before saving
// entrySchema.pre('save', async function (next) {
//   const user = this
//   user.password = await bcrypt.hash(user.password, 8)
// })
const User = mongoose.model('User', entrySchema)

module.exports = User
