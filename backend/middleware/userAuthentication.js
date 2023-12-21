const User = require('../models/user')
const Token = require('../models/tokens')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userAuthentication = async (request, response, next) => {
  // console.log('authorizing')
  if (!request.headers['authorization']) {
    return response.status(401).json({ error: 'Authentication failed' })
  }

  const [authType, authToken] = request.headers.authorization.split(' ')

  if (authType === 'Basic') {
    console.log('its basic')
    const bufferObject = Buffer.from(authToken, 'base64')
    let string = bufferObject.toString('utf8')
    const [email, password] = string.split(':')

    try {
      const user = await User.findOne({ email })

      if (!user) {
        return response.status(401).json({ error: 'Authentication failed' })
      }

      const validUser = await bcrypt.compare(password, user.password)
      // console.log('authenticated successfully')
      if (!validUser) {
        return response.status(401).json({ error: 'Authentication failed' })
      }

      next()
    } catch (error) {
      return response.status(500).json({ error: 'Authentication failed' })
    }
  } else if (authType === 'Bearer') {
    // console.log('its bearer----' + authToken)

    try {
      // console.log('decoding')
      await jwt.verify(
        authToken,
        process.env.JWT_KEY,
        async (error, decoded) => {
          if (error) {
            return response.status(401).json({ error: 'Authentication failed' })
          }
          // console.log('decoded value' + JSON.stringify(decoded))
          const vaildToken = await Token.findOne({
            userId: decoded.userId,
            tokenId: decoded.jti,
            isActive: true,
          })
          // console.log('user is valid' + vaildToken)
          if (!vaildToken) {
            return response
              .status(401)
              .json({ error: 'Authentication failed,Login again' })
          }
          const user = await User.findOne({
            _id: decoded.userId,
          })
          // console.log(user)
          if (!user) {
            return response.status(401).json({ error: 'Authentication failed' })
          }

          request.user = user
          request.tokenDocument = vaildToken
          // request.tokenId = decoded.jti
          // console.log('authorized successfully')
          next()
        }
      )
    } catch (error) {
      return response.status(500).json({ error: 'Server error' })
    }
  } else {
    return response
      .status(401)
      .json({ error: 'Unsupported authentication type' })
  }
}

module.exports = userAuthentication
