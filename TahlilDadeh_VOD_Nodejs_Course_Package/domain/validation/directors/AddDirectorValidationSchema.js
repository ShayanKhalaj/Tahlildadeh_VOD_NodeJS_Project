import Joi from 'joi'

const AddDirectorValidationSchema=Joi.object({
    name: Joi.string().alphanum().required().empty().max(50).message("*"),
    family: Joi.string().alphanum().required().empty().max(50).message("*"),
    nation: Joi.string().alphanum().required().empty().max(50).message("*"),
})

export default AddDirectorValidationSchema