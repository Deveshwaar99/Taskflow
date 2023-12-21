const bcrypt = require('bcrypt')

async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 8)
    return hashedPassword
  } catch (error) {
    throw new Error('Error in bycrypt' + error)
  }
}
module.exports = hashPassword
