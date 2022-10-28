import Joi from "joi";

const userSchema = Joi.object({
  id: Joi.number(),
  firstname: Joi.string().alphanum().min(3).required().messages({
    "string.base": `input should be a type of 'text'`,
    "string.empty": `input cannot be an empty field`,
    "string.min": `input should have a minimum length of {#limit}`,
    "any.required": `input is a required field`,
  }),
  lastname: Joi.string().alphanum().min(1).required().messages({
    "string.base": `input should be a type of 'text'`,
    "string.empty": `input cannot be an empty field`,
    "string.min": `input should have a minimum length of {#limit}`,
    "any.required": `input is a required field`,
  }),

  password: Joi.string().alphanum().min(1).required().messages({
    "string.base": `input should be a type of 'text'`,
    "string.empty": `input cannot be an empty field`,
    "string.min": `input should have a minimum length of {#limit}`,
    "any.required": `input is a required field`,
  }),
});

export { userSchema };
