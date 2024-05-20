import Joi from 'joi'

const EditAuthorValidationSchema = Joi.object({
    authorId:Joi.string().required().empty().max(100).message('*'),
    name: Joi.string().alphanum().required().empty().max(50).message("*"),
    family: Joi.string().alphanum().required().empty().max(50).message("*"),
    nation: Joi.string().alphanum().required().empty().max(50).message("*"),
})

export default EditAuthorValidationSchema