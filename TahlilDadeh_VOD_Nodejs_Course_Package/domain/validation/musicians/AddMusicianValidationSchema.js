import Joi from 'joi'

const AddMusicianValidationSchema = Joi.object({
    name: Joi.string().alphanum().required().empty().max(50).message("*"),
    family: Joi.string().alphanum().required().empty().max(50).message("*"),
    nation: Joi.string().alphanum().required().empty().max(50).message("*"),
})

export default AddMusicianValidationSchema