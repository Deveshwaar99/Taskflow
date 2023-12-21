class httpError extends Error {
  constructor(message = 'An error occured', statusCode = 400) {
    super(message)
    this.statusCode = statusCode
  }
}
module.exports = { httpError }
