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

const ingredient = Joi.object({
  name: Joi.string().required(),
})

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  ingredients: Joi.array().items(ingredient),
});

export {
  ingredientSchema,
  userSchema,
  productSchema,
}
