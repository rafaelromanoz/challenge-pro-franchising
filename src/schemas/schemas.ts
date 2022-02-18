import Joi from 'joi';

const ingredientSchema = Joi.object({
  name: Joi.string().required(),
  unitOfMeasurement: Joi.string().required(),
  unitPrice: Joi.number().required()
});

const userSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
})

export {
  ingredientSchema,
  userSchema,
}
