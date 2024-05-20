import Joi from 'joi'

const AddActorValidationSchema = Joi.object({
    name:Joi.string().alphanum().required().empty().max(50).messages({
        "name.string":"{{#label}} must be string",
        "name.alphanum":"{{#label}} must be alphabets or numbers",
        "any.required" : "{{#label}} must be required",
        "name.max" : "{{#label}} len cannot be more than 50 chars"
    }),
    family:Joi.string().alphanum().required().max(50).messages({
        "family.string":"{{#label}} must be string",
        "family.alphanum":"{{#label}} must be alphabets or numbers",
        "any.required" : "{{#label}} must be required",
        "family.max" : "{{#label}} len cannot be more than 50 chars"
    }),
    nation:Joi.string().alphanum().required().max(50).messages({
        "family.string":"{{#label}} must be string",
        "family.alphanum":"{{#label}} must be alphabets or numbers",
        "any.required" : "{{#label}} must be required",
        "family.max" : "{{#label}} len cannot be more than 50 chars"
    })
})

export default AddActorValidationSchema