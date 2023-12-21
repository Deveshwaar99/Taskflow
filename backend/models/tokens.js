const mongoose = require('mongoose')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    tokenId: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)
tokenSchema.methods.getAuthToken = async function () {
  // const user = this
  const payload = { userId: this.userId.toString(), jti: uuid.v4() }

  const authtoken = jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: '24h',
  })

  this.tokenId = payload.jti
  await this.save()
  return authtoken
}

// tokenSchema.statics.verifyToken=async function(_id)

const Token = mongoose.model('Token', tokenSchema)

module.exports = Token
