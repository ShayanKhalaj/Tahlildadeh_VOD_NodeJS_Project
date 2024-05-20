import Joi from 'joi'

const EditCategoryValidationSchema = Joi.object({
    categoryId:Joi.string().required().empty().message('*'),
    categoryName: Joi.string().alphanum().required().empty().max(50).message("*"),
    description: Joi.string().alphanum().max(200).message("*"),
    categoryImageUrl: Joi.string().max(2000).message("*"),
    categoryImageAlter: Joi.string().alphanum().message("*"),
})

export default EditCategoryValidationSchema