import Joi from 'joi';

const ingredientSchema = Joi.object({
  name: Joi.string().required(),
  unitOfMeasurement: Joi.string().required(),
  unitPrice: Joi.number().required()
});

export {
  ingredientSchema,
}
