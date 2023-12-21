const Joi = require('joi')

function taskSchemaValidate(data) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(5).max(30),
    priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH').required(),
  })
  return schema.validate(data)
}

module.exports = taskSchemaValidate
