import Joi from "joi";

const AddCategoryValidationSchema = Joi.object({
  categoryName: Joi.string().alphanum().required().empty().max(50).message("*"),
  description: Joi.string().alphanum().max(200).message("*"),
  categoryImageUrl: Joi.string().max(2000).message("*"),
  categoryImageAlter: Joi.string().alphanum().message("*"),
});


export default AddCategoryValidationSchema