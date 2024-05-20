import Joi from "joi";

const AddBoxValidationSchema = Joi.object({
  title: Joi.string().alphanum().required().empty().max(100).message("*"),
  description: Joi.string().alphanum().max(200).message("*"),
});

export default AddBoxValidationSchema
