import Joi from 'joi'

const AddGenreValidationSchema = Joi.object({
    genreName:Joi.string().required().empty().max(50).messages({
        "any.required":"{{#label}} is required",
        "string.empty":"*",
        "string.alphanum":"alphabets and number",
        "string.max":"50 chars"
    }),
    description:Joi.string().allow('').max(200).message('*')
})

export default AddGenreValidationSchema