import Joi from 'joi'

const EditDirectorValidationSchema=Joi.object({
    directorId:Joi.string().required().empty().message('*'),
    name: Joi.string().alphanum().required().empty().max(50).message("*"),
    family: Joi.string().alphanum().required().empty().max(50).message("*"),
    nation: Joi.string().alphanum().required().empty().max(50).message("*"),
})

export default EditDirectorValidationSchema