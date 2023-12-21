import Joi from 'joi'

function loginSchemaValidate(data) {
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(7).max(30).required(),
  })
  return schema.validate(data)
}
function userSchemaValidate(data) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(12).required(),
    lastName: Joi.string().min(2).max(12).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(7).max(30).required(),
  })
  return schema.validate(data)
}

export { loginSchemaValidate, userSchemaValidate }
